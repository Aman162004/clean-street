const { mongoose } = require('../config/db');
require('./User');

const toObjectId = (value) => {
    if (!value) return null;
    return mongoose.Types.ObjectId.isValid(value) ? new mongoose.Types.ObjectId(value) : null;
};

const VoteSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        vote_type: { type: String, enum: ['up', 'down'], required: true }
    },
    { _id: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const CommentSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const ComplaintSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        department: { type: String, default: 'Unassigned' },
        type: { type: String, default: 'Other' },
        priority: { type: String, default: 'Medium' },
        address: { type: String, required: true },
        landmark: { type: String, default: '' },
        description: { type: String, required: true },
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
        status: { type: String, default: 'Pending' },
        photo: { type: String, default: '' },
        proof_photo: { type: String, default: '' },
        assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
        votes: { type: [VoteSchema], default: [] },
        comments: { type: [CommentSchema], default: [] }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const ComplaintModel = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
const UserModel = mongoose.models.User;

const priorityOrder = { Critical: 1, High: 2, Medium: 3, Low: 4 };

const sortComplaints = (a, b) => {
    const pa = priorityOrder[a.priority] || 5;
    const pb = priorityOrder[b.priority] || 5;
    if (pa !== pb) return pa - pb;
    return new Date(b.created_at) - new Date(a.created_at);
};

const toComplaintPayload = (doc, currentUserId = null) => {
    const complaint = doc.toObject ? doc.toObject() : doc;
    const currentUser = currentUserId ? String(currentUserId) : null;

    const upvotes = (complaint.votes || []).filter(v => v.vote_type === 'up').length;
    const downvotes = (complaint.votes || []).filter(v => v.vote_type === 'down').length;
    const userVote = currentUser
        ? (complaint.votes || []).find(v => String(v.user_id) === currentUser)?.vote_type || null
        : null;

    return {
        ...complaint,
        id: String(complaint._id),
        user_id: complaint.user_id?._id ? String(complaint.user_id._id) : String(complaint.user_id),
        assigned_to: complaint.assigned_to?._id ? String(complaint.assigned_to._id) : (complaint.assigned_to ? String(complaint.assigned_to) : null),
        user_name: complaint.user_id?.name,
        user_email: complaint.user_id?.email,
        user_phone: complaint.user_id?.phone,
        department: complaint.department,
        volunteer_name: complaint.assigned_to?.name,
        volunteer_email: complaint.assigned_to?.email,
        proof_photo: complaint.proof_photo,
        upvotes,
        downvotes,
        comment_count: (complaint.comments || []).length,
        user_vote: userVote
    };
};

const Complaint = {
    async create({ user_id, title, department, assigned_to, type, priority, address, landmark, description, latitude, longitude, photo, status }) {
        const payload = {
            user_id: toObjectId(user_id),
            title,
            department: department || 'Unassigned',
            type,
            priority,
            address,
            landmark,
            description,
            latitude,
            longitude,
            photo: photo || '',
            proof_photo: ''
        };
        if (assigned_to !== undefined && assigned_to !== null) {
            payload.assigned_to = toObjectId(assigned_to);
        }
        if (status !== undefined && status !== null) {
            payload.status = status;
        }

        const complaint = await ComplaintModel.create(payload);
        return toComplaintPayload(complaint);
    },

    async findAll() {
        const complaints = await ComplaintModel.find({}).sort({ created_at: -1 });
        return complaints.map(c => toComplaintPayload(c)).sort(sortComplaints);
    },

    async findById(complaintId) {
        if (!mongoose.Types.ObjectId.isValid(complaintId)) return null;
        const complaint = await ComplaintModel.findById(complaintId);
        return complaint ? toComplaintPayload(complaint) : null;
    },

    async getStats() {
        const [total, pending, inProgress, resolved] = await Promise.all([
            ComplaintModel.countDocuments({}),
            ComplaintModel.countDocuments({ $or: [{ status: 'Pending' }, { status: null }, { status: '' }] }),
            ComplaintModel.countDocuments({ status: 'In Progress' }),
            ComplaintModel.countDocuments({ status: 'Resolved' })
        ]);

        return {
            total,
            pending,
            in_progress: inProgress,
            resolved
        };
    },

    async getRecent(limit = 5) {
        const recent = await ComplaintModel.find({}).sort({ created_at: -1 }).limit(limit);
        return recent.map(c => toComplaintPayload(c));
    },

    async assignVolunteer(complaintId, volunteerId) {
        if (!mongoose.Types.ObjectId.isValid(complaintId)) return null;
        const updated = await ComplaintModel.findByIdAndUpdate(
            complaintId,
            { assigned_to: toObjectId(volunteerId), status: 'In Progress' },
            { new: true }
        );
        return updated ? toComplaintPayload(updated) : null;
    },

    async updateStatus(complaintId, status) {
        if (!mongoose.Types.ObjectId.isValid(complaintId)) return null;
        const updated = await ComplaintModel.findByIdAndUpdate(complaintId, { status }, { new: true });
        return updated ? toComplaintPayload(updated) : null;
    },

    async resolveWithProof(complaintId, proofPhotoUrl) {
        if (!mongoose.Types.ObjectId.isValid(complaintId)) return null;
        const updated = await ComplaintModel.findByIdAndUpdate(
            complaintId, 
            { status: 'Resolved', proof_photo: proofPhotoUrl }, 
            { new: true }
        );
        return updated ? toComplaintPayload(updated) : null;
    },

    async findAllWithDetails(currentUserId = null) {
        const complaints = await ComplaintModel.find({})
            .populate('user_id', 'name email phone role')
            .populate('assigned_to', 'name email role')
            .sort({ created_at: -1 });

        return complaints.map(c => toComplaintPayload(c, currentUserId)).sort(sortComplaints);
    },

    async findByUserIdWithDetails(userId, currentUserId = null) {
        const objId = toObjectId(userId);
        if (!objId) return [];

        const complaints = await ComplaintModel.find({ user_id: objId })
            .populate('user_id', 'name email phone role')
            .populate('assigned_to', 'name email role')
            .sort({ created_at: -1 });

        return complaints.map(c => toComplaintPayload(c, currentUserId));
    },

    async findByVolunteerId(volunteerId) {
        const objId = toObjectId(volunteerId);
        if (!objId) return [];

        const complaints = await ComplaintModel.find({ assigned_to: objId })
            .populate('user_id', 'name email phone role')
            .populate('assigned_to', 'name email role')
            .sort({ created_at: -1 });

        return complaints.map(c => toComplaintPayload(c)).sort((a, b) => {
            const statusOrder = { 'In Progress': 1, Pending: 2, Resolved: 3 };
            const sa = statusOrder[a.status] || 4;
            const sb = statusOrder[b.status] || 4;
            if (sa !== sb) return sa - sb;
            return sortComplaints(a, b);
        });
    },

    async voteComplaint(complaintId, userId, voteType) {
        const complaintObjId = toObjectId(complaintId);
        const userObjId = toObjectId(userId);
        if (!complaintObjId || !userObjId) return null;

        const complaint = await ComplaintModel.findById(complaintObjId);
        if (!complaint) return null;

        const existingVote = complaint.votes.find(v => String(v.user_id) === String(userObjId));
        if (existingVote) {
            existingVote.vote_type = voteType;
        } else {
            complaint.votes.push({ user_id: userObjId, vote_type: voteType });
        }

        await complaint.save();
        return { complaint_id: String(complaint._id), user_id: String(userObjId), vote_type: voteType };
    },

    async addComment(complaintId, userId, comment) {
        const complaintObjId = toObjectId(complaintId);
        const userObjId = toObjectId(userId);
        if (!complaintObjId || !userObjId) return null;

        const complaintDoc = await ComplaintModel.findById(complaintObjId);
        if (!complaintDoc) return null;

        complaintDoc.comments.unshift({ user_id: userObjId, comment });
        await complaintDoc.save();
        const inserted = complaintDoc.comments[0];

        return {
            id: String(inserted._id),
            complaint_id: String(complaintDoc._id),
            user_id: String(userObjId),
            comment: inserted.comment,
            created_at: inserted.created_at
        };
    },

    async getCommentsByComplaintId(complaintId) {
        const complaintObjId = toObjectId(complaintId);
        if (!complaintObjId) return [];

        const complaint = await ComplaintModel.findById(complaintObjId).lean();
        if (!complaint) return [];

        const userIds = [...new Set((complaint.comments || []).map(c => String(c.user_id)))].filter(Boolean);
        const users = await UserModel.find({ _id: { $in: userIds } }, 'name role').lean();
        const userMap = new Map(users.map(u => [String(u._id), u]));

        return (complaint.comments || [])
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map(comment => ({
                id: String(comment._id),
                complaint_id: String(complaint._id),
                user_id: String(comment.user_id),
                comment: comment.comment,
                created_at: comment.created_at,
                user_name: userMap.get(String(comment.user_id))?.name,
                user_role: userMap.get(String(comment.user_id))?.role
            }));
    }
};

module.exports = Complaint;

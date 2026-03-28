const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { uploadBufferToCloudinary } = require('../middlewares/upload');

const DELHI_DISTRICTS = [
    'North',
    'North-East',
    'North-West',
    'West',
    'South',
    'South-West',
    'South-East',
    'New Delhi',
    'Central',
    'Shahdara',
    'East'
];

const normalize = (value) => String(value || '').trim();

const matchesNormalized = (a, b) => normalize(a).toLowerCase() === normalize(b).toLowerCase();

const inferDistrictFromAddress = (address) => {
    const normalizedAddress = normalize(address).toLowerCase();
    if (!normalizedAddress) return '';

    const matched = DELHI_DISTRICTS.find((district) => normalizedAddress.includes(district.toLowerCase()));
    return matched || '';
};

const getUserDistrict = async (userId) => {
    const user = await User.findById(userId);
    return {
        user,
        district: normalize(user?.district)
    };
};

const ensureCitizen = (req, res) => {
    const role = String(req.user.role || '').toLowerCase();
    if (role !== 'citizen') {
        res.status(403).json({
            success: false,
            message: 'Only citizens can upvote, downvote, or comment.'
        });
        return false;
    }
    return true;
};

const createComplaint = async (req, res) => {
    try {
        console.log('--- Complaint Submission Debug ---');
        console.log('Body:', req.body);
        console.log('User from Token:', req.user);

        const { title, type, priority, address, landmark, description, latitude, longitude, state, district } = req.body;
        const user_id = req.user ? req.user.id : null;
        let photo = '';

        if (req.file?.buffer) {
            const uploaded = await uploadBufferToCloudinary(req.file.buffer);
            photo = uploaded.secure_url || '';
        }

        if (!user_id) {
            console.error('Submission failed: No user_id in token');
            return res.status(401).json({ success: false, message: 'User not authenticated. Please log in again.' });
        }

        // Only citizens can file complaints
        const role = String(req.user.role || '').toLowerCase();
        if (role !== 'citizen') {
            return res.status(403).json({ 
                success: false, 
                message: 'Only citizens can file complaints. Volunteers and admins cannot create complaints.' 
            });
        }

        let assignedDepartment = 'Other';
        let assignedVolunteerId = null;
        let complaintStatus = 'Pending';

        try {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey && apiKey !== 'your_gemini_api_key_here') {
                const genAI = new GoogleGenerativeAI(apiKey);
                const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
                let responseText = null;

                for (const modelName of modelsToTry) {
                    try {
                        const model = genAI.getGenerativeModel({ 
                            model: modelName,
                            generationConfig: { temperature: 0.1 }
                        });
                        
                        const prompt = `Classify the following civic issue into exactly one of these departments:
"Waste Management", "Roads & Transportation", "Water & Sanitation", "Electrical & Lighting", "Public Parks", "Other".
Return ONLY the exact given string name of the department, with no extra characters or markdown.
Title: ${title}
Description: ${description}`;

                        const result = await model.generateContent(prompt);
                        responseText = result.response.text().trim();
                        if (responseText) break;
                    } catch (err) {
                        console.error(`Gemini classification failed for ${modelName}:`, err.message);
                        // Continue to next model
                    }
                }
                
                const validDepartments = ["Waste Management", "Roads & Transportation", "Water & Sanitation", "Electrical & Lighting", "Public Parks", "Other"];
                if (responseText && validDepartments.includes(responseText)) {
                    assignedDepartment = responseText;
                }
            }
        } catch (aiErr) {
            console.error('AI Classification error in createComplaint:', aiErr);
            // Fallback to Other
        }

        const citizen = await User.findById(user_id);
        const complaintState = normalize(state) || normalize(citizen?.state);
        const complaintDistrict = normalize(district) || normalize(citizen?.district) || inferDistrictFromAddress(address);

        if (!complaintState || !complaintDistrict) {
            return res.status(400).json({
                success: false,
                message: 'State and district are required to submit a complaint.'
            });
        }

        if (assignedDepartment !== 'Other' && complaintDistrict) {
            const volunteers = await User.findVolunteersByDepartmentAndDistrict(assignedDepartment, complaintDistrict);
            if (volunteers && volunteers.length > 0) {
                const randomVolunteer = volunteers[Math.floor(Math.random() * volunteers.length)];
                assignedVolunteerId = randomVolunteer.id;
                complaintStatus = 'In Progress';
            }
        }

        const complaint = await Complaint.create({
            user_id,
            title,
            department: assignedDepartment,
            assigned_to: assignedVolunteerId,
            status: complaintStatus,
            type,
            priority,
            address,
            landmark,
            description,
            latitude: latitude !== undefined && latitude !== null && latitude !== '' ? Number(latitude) : null,
            longitude: longitude !== undefined && longitude !== null && longitude !== '' ? Number(longitude) : null,
            photo,
            state: complaintState,
            district: complaintDistrict
        });

        res.status(201).json({
            success: true,
            message: 'Complaint reported successfully',
            data: complaint
        });
    } catch (err) {
        console.error('SERVER ERROR IN createComplaint:', err);
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const role = normalize(req.user.role).toLowerCase();

        if (role === 'volunteer') {
            const complaints = await Complaint.findByVolunteerId(req.user.id);
            return res.json({ success: true, data: complaints });
        }

        if (role === 'admin') {
            const { district: adminDistrict } = await getUserDistrict(req.user.id);
            if (!adminDistrict) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin profile must have district set before viewing complaints.'
                });
            }

            const complaints = await Complaint.findAllWithDetails(req.user.id, { district: adminDistrict });
            return res.json({ success: true, data: complaints });
        }

        const complaints = await Complaint.findAllWithDetails(req.user.id);
        res.json({ success: true, data: complaints });
    } catch (err) {
        console.error('Error in getAllComplaints:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUserComplaints = async (req, res) => {
    try {
        const userId = req.user.id;
        const complaints = await Complaint.findByUserIdWithDetails(userId, req.user.id);
        res.json({ success: true, data: complaints });
    } catch (err) {
        console.error('Error in getUserComplaints:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const upvoteComplaint = async (req, res) => {
    try {
        if (!ensureCitizen(req, res)) return;

        const { complaintId } = req.params;
        await Complaint.voteComplaint(complaintId, req.user.id, 'up');
        res.json({ success: true, message: 'Upvoted successfully' });
    } catch (err) {
        console.error('Error in upvoteComplaint:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const downvoteComplaint = async (req, res) => {
    try {
        if (!ensureCitizen(req, res)) return;

        const { complaintId } = req.params;
        await Complaint.voteComplaint(complaintId, req.user.id, 'down');
        res.json({ success: true, message: 'Downvoted successfully' });
    } catch (err) {
        console.error('Error in downvoteComplaint:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const addComplaintComment = async (req, res) => {
    try {
        if (!ensureCitizen(req, res)) return;

        const { complaintId } = req.params;
        const { comment } = req.body;

        if (!comment || !comment.trim()) {
            return res.status(400).json({ success: false, message: 'Comment is required' });
        }

        await Complaint.addComment(complaintId, req.user.id, comment.trim());
        res.status(201).json({ success: true, message: 'Comment added successfully' });
    } catch (err) {
        console.error('Error in addComplaintComment:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getComplaintComments = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const comments = await Complaint.getCommentsByComplaintId(complaintId);
        res.json({ success: true, data: comments });
    } catch (err) {
        console.error('Error in getComplaintComments:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const role = normalize(req.user.role).toLowerCase();
        let filters = {};

        if (role === 'admin') {
            const { district: adminDistrict } = await getUserDistrict(req.user.id);
            if (!adminDistrict) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin profile must have district set before viewing stats.'
                });
            }
            filters = { district: adminDistrict };
        } else if (role === 'volunteer') {
            filters = { assigned_to: req.user.id };
        }

        const stats = await Complaint.getStats(filters);
        const recent = await Complaint.getRecent(5, filters);

        res.json({
            success: true,
            stats: {
                total: parseInt(stats.total) || 0,
                pending: parseInt(stats.pending) || 0,
                in_progress: parseInt(stats.in_progress) || 0,
                resolved: parseInt(stats.resolved) || 0
            },
            recent: recent
        });
    } catch (err) {
        console.error('Error in getDashboardStats:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const assignVolunteer = async (req, res) => {
    try {
        const { complaintId, volunteerId } = req.body;
        
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Admin privileges required.' 
            });
        }

        if (!complaintId || !volunteerId) {
            return res.status(400).json({
                success: false,
                message: 'complaintId and volunteerId are required.'
            });
        }

        const [{ user: adminUser, district: adminDistrict }, complaint, volunteerUser] = await Promise.all([
            getUserDistrict(req.user.id),
            Complaint.findByIdWithDetails(complaintId, req.user.id),
            User.findById(volunteerId)
        ]);

        if (!adminUser || !adminDistrict) {
            return res.status(400).json({
                success: false,
                message: 'Admin profile must have district set before assigning volunteers.'
            });
        }

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        if (!matchesNormalized(complaint.district, adminDistrict)) {
            return res.status(403).json({
                success: false,
                message: 'You can only assign volunteers to complaints in your district.'
            });
        }

        if (!volunteerUser || normalize(volunteerUser.role).toLowerCase() !== 'volunteer') {
            return res.status(400).json({
                success: false,
                message: 'Selected user is not a volunteer.'
            });
        }

        if (!matchesNormalized(volunteerUser.district, adminDistrict)) {
            return res.status(403).json({
                success: false,
                message: 'Volunteer must belong to your district.'
            });
        }

        if (!matchesNormalized(volunteerUser.department, complaint.department)) {
            return res.status(403).json({
                success: false,
                message: 'Volunteer department must match complaint department.'
            });
        }

        const updatedComplaint = await Complaint.assignVolunteer(complaintId, volunteerId);
        
        if (!updatedComplaint) {
            return res.status(404).json({ 
                success: false, 
                message: 'Complaint not found' 
            });
        }

        res.json({
            success: true,
            message: 'Volunteer assigned successfully',
            data: updatedComplaint
        });
    } catch (err) {
        console.error('Error in assignVolunteer:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { status } = req.body;
        const role = normalize(req.user.role).toLowerCase();
        
        // Check if user is admin or volunteer
        if (!['admin', 'volunteer'].includes(role)) {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Admin or volunteer privileges required.' 
            });
        }

        const complaint = await Complaint.findByIdWithDetails(complaintId, req.user.id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        if (role === 'volunteer' && !matchesNormalized(complaint.assigned_to, req.user.id)) {
            return res.status(403).json({
                success: false,
                message: 'You can only update complaints assigned to you.'
            });
        }

        if (role === 'admin') {
            const { district: adminDistrict } = await getUserDistrict(req.user.id);
            if (!adminDistrict) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin profile must have district set before updating complaint status.'
                });
            }

            if (!matchesNormalized(complaint.district, adminDistrict)) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only update complaints from your district.'
                });
            }
        }

        const updatedComplaint = await Complaint.updateStatus(complaintId, status);
        
        if (!updatedComplaint) {
            return res.status(404).json({ 
                success: false, 
                message: 'Complaint not found' 
            });
        }

        res.json({
            success: true,
            message: 'Status updated successfully',
            data: updatedComplaint
        });
    } catch (err) {
        console.error('Error in updateComplaintStatus:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getVolunteerComplaints = async (req, res) => {
    try {
        const volunteerId = req.user.id;
        
        // Check if user is volunteer
        if (normalize(req.user.role).toLowerCase() !== 'volunteer') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Volunteer privileges required.' 
            });
        }

        const complaints = await Complaint.findByVolunteerId(volunteerId);
        res.json({ success: true, data: complaints });
    } catch (err) {
        console.error('Error in getVolunteerComplaints:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const resolveComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        
        // Ensure user is volunteer or admin
        if (!['admin', 'volunteer'].includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied. Volunteer privileges required.' });
        }

        // Require image proof
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ success: false, message: 'A proof photo is strictly required to resolve a complaint.' });
        }

        // Fetch original complaint details
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }

        // Verify with Gemini
        let isResolved = false;
        let aiRejectionReason = 'The photo provided does not clearly show the issue is resolved, or is irrelevant. Please provide a clear, valid proof photo.';
        try {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey && apiKey !== 'your_gemini_api_key_here') {
                const genAI = new GoogleGenerativeAI(apiKey);
                // Use exact same model list that works for department classification
                const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
                let aiResult = null;

                for (const modelName of modelsToTry) {
                    try {
                        const model = genAI.getGenerativeModel({ 
                            model: modelName,
                            generationConfig: { temperature: 0.1 }
                        });
                
                        let promptParts = [];
                        let hasBefore = false;
                        let beforeImageData = null;

                        // Fetch BEFORE image data first (if citizen uploaded one)
                        if (complaint.photo) {
                            try {
                                const response = await fetch(complaint.photo);
                                if (response.ok) {
                                    const buffer = await response.arrayBuffer();
                                    const mimeType = response.headers.get('content-type') || 'image/jpeg';
                                    beforeImageData = {
                                        inlineData: {
                                            data: Buffer.from(buffer).toString("base64"),
                                            mimeType: mimeType
                                        }
                                    };
                                    hasBefore = true;
                                    console.log('Successfully fetched BEFORE image for comparison');
                                }
                            } catch (err) {
                                console.error('Failed to fetch BEFORE image for AI verification', err.message);
                            }
                        }

                        // BUILD PROMPT: Text instruction FIRST, then images
                        let promptText = `You are a city management AI that verifies civic issue resolutions by comparing photos.

REPORTED ISSUE: "${complaint.title}"
DESCRIPTION: "${complaint.description}"
`;

                        if (hasBefore) {
                            promptText += `
I will show you two photos in order:
1. BEFORE photo — showing the original problem reported by the citizen
2. AFTER photo — the volunteer's proof that they fixed it

Your task: Determine if the problem described above has been FIXED in the AFTER photo compared to the BEFORE photo.

APPROVE (is_resolved: true) if:
- The AFTER photo shows the defect has been repaired (e.g., a pothole filled with asphalt, garbage cleaned up, a broken light replaced)
- There is a visible physical change showing repair work was done

REJECT (is_resolved: false) if:
- Both photos look identical — no repair work was done
- The problem (pothole, garbage, damage) is still clearly present in the AFTER photo
- The AFTER photo is blurry, irrelevant, or unrelated
`;
                        } else {
                            promptText += `
I will show you ONE photo — the volunteer's proof that they fixed the issue. No original "before" photo is available.

APPROVE (is_resolved: true) if:
- The photo shows evidence of completed repair work (fresh asphalt patch, cleaned area, fixed infrastructure)
- The described problem does NOT appear to still exist

REJECT (is_resolved: false) if:
- The described problem is clearly still visible in the photo
- The photo is blurry, irrelevant, or shows no evidence of work done
`;
                        }

                        promptText += `
Reply with ONLY this JSON format, nothing else:
{"is_resolved": true, "reason": "Brief explanation"}
or
{"is_resolved": false, "reason": "Brief explanation"}`;

                        // Order: TEXT → BEFORE image → AFTER image
                        promptParts.push({ text: promptText });

                        if (hasBefore && beforeImageData) {
                            promptParts.push({ text: "BEFORE photo (the original problem):" });
                            promptParts.push(beforeImageData);
                            promptParts.push({ text: "AFTER photo (volunteer's proof of fix):" });
                        }

                        // Add AFTER image (volunteer's proof)
                        promptParts.push({
                            inlineData: {
                                data: req.file.buffer.toString("base64"),
                                mimeType: req.file.mimetype
                            }
                        });

                        const result = await model.generateContent(promptParts);
                        const text = result.response.text().trim();
                        console.log(`Gemini (${modelName}) raw response:`, text);
                        
                        const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
                        aiResult = JSON.parse(cleanJson);
                        break; // Successfully got a parsed result
                    } catch (err) {
                        console.error(`Gemini resolve verification failed for ${modelName}:`, err.message);
                        // Try next model
                    }
                }
                
                if (aiResult && aiResult.is_resolved === true) {
                    isResolved = true;
                    console.log('Gemini APPROVED resolution. Reason:', aiResult.reason);
                } else {
                    aiRejectionReason = aiResult?.reason || aiRejectionReason;
                    console.log('Gemini REJECTED resolution. Reason:', aiRejectionReason);
                }
            } else {
                // If API key is missing, skip AI check and allow
                isResolved = true; 
            }
        } catch (aiErr) {
            console.error('Gemini Vision error in resolveComplaint:', aiErr);
            // If AI is entirely down or rate limits hit, we cannot block volunteers from working
            isResolved = true;
        }

        if (!isResolved) {
            return res.status(400).json({ 
                success: false, 
                message: `AI Verification Failed: ${aiRejectionReason}` 
            });
        }

        // Upload to Cloudinary now that AI approved it
        const uploaded = await uploadBufferToCloudinary(req.file.buffer);
        const photoUrl = uploaded.secure_url || '';

        // Update DB
        const updatedComplaint = await Complaint.resolveWithProof(complaintId, photoUrl);

        res.json({
            success: true,
            message: 'Complaint resolved and verified by AI successfully!',
            data: updatedComplaint
        });
    } catch (err) {
        console.error('Error in resolveComplaint:', err);
        res.status(500).json({ success: false, message: `Server error: ${err.message}`, stack: err.stack });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getUserComplaints,
    getVolunteerComplaints,
    getDashboardStats,
    assignVolunteer,
    updateComplaintStatus,
    upvoteComplaint,
    downvoteComplaint,
    addComplaintComment,
    getComplaintComments,
    resolveComplaint
};

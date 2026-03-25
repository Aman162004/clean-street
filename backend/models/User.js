const { mongoose } = require('../config/db');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        location: { type: String, default: '' },
        role: { type: String, enum: ['citizen', 'volunteer', 'admin'], default: 'citizen' },
        department: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

const toUserObject = (doc) => {
    if (!doc) return null;
    const user = doc.toObject ? doc.toObject() : doc;
    return {
        ...user,
        id: String(user._id)
    };
};

const User = {
    async create({ name, email, password, location, role, department, profile_photo, phone }) {
        const user = await UserModel.create({
            name,
            email: String(email).toLowerCase(),
            password,
            location: location || '',
            role: role || 'citizen',
            department: department || '',
            profile_photo: profile_photo || '',
            phone: phone || ''
        });

        return toUserObject(user);
    },

    async findByEmail(email) {
        const user = await UserModel.findOne({ email: String(email).toLowerCase() });
        return toUserObject(user);
    },

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const user = await UserModel.findById(id);
        return toUserObject(user);
    },

    async updateProfile(id, { name, email, phone, location, department }) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const updatePayload = {};
        if (name !== undefined) updatePayload.name = name;
        if (email !== undefined) updatePayload.email = String(email).toLowerCase();
        if (phone !== undefined) updatePayload.phone = phone;
        if (location !== undefined) updatePayload.location = location;
        if (department !== undefined) updatePayload.department = department;

        const updated = await UserModel.findByIdAndUpdate(id, updatePayload, { new: true });
        return toUserObject(updated);
    },

    async findAll() {
        const users = await UserModel.find({}).sort({ created_at: -1 });
        return users.map(toUserObject);
    },

    async updateRole(userId, role) {
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;
        const updated = await UserModel.findByIdAndUpdate(userId, { role }, { new: true });
        return toUserObject(updated);
    },

    async findVolunteersByDepartment(department) {
        if (!department) return [];
        const users = await UserModel.find({ role: 'volunteer', department });
        return users.map(toUserObject);
    }
};

module.exports = User;

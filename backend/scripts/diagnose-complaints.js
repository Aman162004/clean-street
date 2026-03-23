const { connectDB, mongoose } = require('../config/db');
require('../models/Complaint');

async function diagnose() {
    try {
        await connectDB();
        const grouped = await mongoose.models.Complaint.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        console.log('--- STATUS DISTRIBUTION ---');
        console.log(grouped.map(item => ({ status: item._id, count: item.count })));

        const all = await mongoose.models.Complaint.find({}, 'title status').lean();
        console.log('--- ALL COMPLAINTS ---');
        console.log(all.map(c => ({ id: String(c._id), title: c.title, status: c.status })));
    } catch (e) {
        console.error('Diagnosis error:', e);
    } finally {
        await mongoose.connection.close();
    }
}

diagnose();

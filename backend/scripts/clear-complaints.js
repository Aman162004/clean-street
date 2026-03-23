const { connectDB, mongoose } = require('../config/db');
require('../models/Complaint');

async function clearComplaints() {
    try {
        await connectDB();
        console.log('Clearing all complaints...');
        await mongoose.models.Complaint.deleteMany({});
        console.log('Successfully cleared all complaints.');
        await mongoose.connection.close();
        process.exit(0);
    } catch (e) {
        console.error('Error clearing complaints:', e);
        await mongoose.connection.close();
        process.exit(1);
    }
}

clearComplaints();

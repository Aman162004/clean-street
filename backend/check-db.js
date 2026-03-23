const { connectDB, mongoose } = require('./config/db');
require('./models/User');
require('./models/Complaint');
require('dotenv').config();

async function checkTables() {
    try {
        await connectDB();
        console.log('📊 Checking MongoDB structure...\n');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📚 Collections:');
        collections.forEach(c => console.log(`  - ${c.name}`));

        const UserModel = mongoose.models.User;
        const ComplaintModel = mongoose.models.Complaint;

        const userCount = await UserModel.countDocuments({});
        const complaintCount = await ComplaintModel.countDocuments({});

        console.log(`\n👥 Users count: ${userCount}`);
        console.log(`📝 Complaints count: ${complaintCount}`);

        const sampleUser = await UserModel.findOne({}, 'name email role created_at').lean();
        if (sampleUser) {
            console.log('\n👤 Sample User:');
            console.log(JSON.stringify(sampleUser, null, 2));
        }

        const sampleComplaint = await ComplaintModel.findOne({}, 'title status priority created_at').lean();
        if (sampleComplaint) {
            console.log('\n📋 Sample Complaint:');
            console.log(JSON.stringify(sampleComplaint, null, 2));
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

checkTables();
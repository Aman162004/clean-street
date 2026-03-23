const { connectDB, mongoose } = require('./config/db');
require('./models/User');
require('./models/Complaint');
require('dotenv').config();

async function fixMongoIndexes() {
    try {
        console.log('🔧 Verifying MongoDB indexes and schema assumptions...\n');
        await connectDB();

        await mongoose.models.User.collection.createIndex({ email: 1 }, { unique: true });
        await mongoose.models.User.collection.createIndex({ role: 1 });
        await mongoose.models.Complaint.collection.createIndex({ user_id: 1 });
        await mongoose.models.Complaint.collection.createIndex({ assigned_to: 1 });
        await mongoose.models.Complaint.collection.createIndex({ status: 1 });
        await mongoose.models.Complaint.collection.createIndex({ created_at: -1 });

        console.log('✅ MongoDB indexes verified successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
}

fixMongoIndexes()
    .then(() => {
        console.log('\n✨ Database fix complete!');
        process.exit(0);
    })
    .catch(err => {
        console.error('\n❌ Fix failed:', err.message);
        process.exit(1);
    });

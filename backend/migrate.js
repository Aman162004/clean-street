const { connectDB, mongoose } = require('./config/db');
require('./models/User');
require('./models/Complaint');
require('dotenv').config();

async function runMigrations() {
    try {
        console.log('Connecting to MongoDB...');
        await connectDB();

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        if (!collections.find(c => c.name === 'users')) {
            await db.createCollection('users');
        }
        if (!collections.find(c => c.name === 'complaints')) {
            await db.createCollection('complaints');
        }

        await mongoose.models.User.collection.createIndex({ email: 1 }, { unique: true });
        await mongoose.models.User.collection.createIndex({ role: 1 });
        await mongoose.models.Complaint.collection.createIndex({ user_id: 1 });
        await mongoose.models.Complaint.collection.createIndex({ assigned_to: 1 });
        await mongoose.models.Complaint.collection.createIndex({ status: 1 });
        await mongoose.models.Complaint.collection.createIndex({ created_at: -1 });

        const userCount = await mongoose.models.User.countDocuments({});
        const complaintCount = await mongoose.models.Complaint.countDocuments({});

        console.log('MongoDB migration/setup completed successfully!');
        console.log(`Users collection: ${userCount} records`);
        console.log(`Complaints collection: ${complaintCount} records`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

runMigrations();
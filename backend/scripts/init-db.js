const { connectDB, mongoose } = require('../config/db');
require('../models/User');
require('../models/Complaint');

const initDB = async () => {
    try {
        console.log('Initializing MongoDB...');
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
        await mongoose.models.Complaint.collection.createIndex({ created_at: -1 });

        console.log('✅ MongoDB initialized successfully!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error initializing MongoDB:', err);
        await mongoose.connection.close();
        process.exit(1);
    }
};

initDB();

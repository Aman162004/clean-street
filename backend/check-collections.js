const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📦 Collections in active database:');
        collections.forEach(col => {
            console.log(`  - ${col.name}`);
        });
        
        // Get collection stats
        console.log('\n📊 Collection Statistics:');
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`  ${col.name}: ${count} documents`);
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

connectDB();

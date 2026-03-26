const mongoose = require('mongoose');
require('dotenv').config();

// Check both databases
const checkDatabase = async (uri) => {
    try {
        await mongoose.connect(uri);
        const dbName = new URL(uri).pathname.split('/')[1];
        console.log(`\n========== DATABASE: ${dbName} ==========`);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        
        console.log(`Collections: ${collections.length}`);
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`  - ${col.name}: ${count} documents`);
        }
        
        await mongoose.connection.close();
    } catch (err) {
        console.error(`Error connecting to ${uri}:`, err.message);
    }
};

const clean_street_uri = 'mongodb+srv://ar8709013993_db_user:FADnUdCgMw1jdyau@cluster0.rw5dcv5.mongodb.net/clean_street?retryWrites=true&w=majority';
const test_uri = 'mongodb+srv://ar8709013993_db_user:FADnUdCgMw1jdyau@cluster0.rw5dcv5.mongodb.net/test?retryWrites=true&w=majority';

(async () => {
    await checkDatabase(clean_street_uri);
    await checkDatabase(test_uri);
    process.exit(0);
})();

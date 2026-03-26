const mongoose = require('mongoose');
require('dotenv').config();

const deleteTestDB = async () => {
    try {
        const test_uri = 'mongodb+srv://ar8709013993_db_user:FADnUdCgMw1jdyau@cluster0.rw5dcv5.mongodb.net/test?retryWrites=true&w=majority';
        
        await mongoose.connect(test_uri);
        console.log('🔗 Connected to test database');
        
        // Drop the entire test database
        await mongoose.connection.db.dropDatabase();
        console.log('✅ Test database deleted successfully');
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error deleting test database:', err.message);
        process.exit(1);
    }
};

deleteTestDB();

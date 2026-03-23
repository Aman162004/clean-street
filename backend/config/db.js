const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('Missing MongoDB connection string. Set MONGODB_URI in your environment.');
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 8000,
            socketTimeoutMS: 15000,
            maxPoolSize: 10
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        throw err;
    }
};

module.exports = { mongoose, connectDB };
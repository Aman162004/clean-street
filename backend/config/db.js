const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

const connectDB = async (retries = 3) => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB');
            return;
        }

        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('Missing MongoDB connection string. Set MONGODB_URI in your environment.');
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 15000,
            maxPoolSize: 10,
            retryWrites: true
        });
        console.log('MongoDB Connected successfully');
        return;
    } catch (err) {
        console.error(`Database Connection Error (attempt): ${err.message}`);

        if (retries > 0) {
            console.log(`Retrying in 2 seconds... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return connectDB(retries - 1);
        }

        console.error('Failed to connect to MongoDB after all retries');
        throw err;
    }
};

module.exports = { mongoose, connectDB };
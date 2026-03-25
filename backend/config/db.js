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
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            maxPoolSize: 5,
            minPoolSize: 1,
            maxIdleTimeMS: 60000,
            retryWrites: true,
            family: 4,
            // Disable connection pooling in serverless to prevent stale connections
            ...(process.env.VERCEL && { maxPoolSize: 1 })
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
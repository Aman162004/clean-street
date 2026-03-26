const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferCommands', true); // Enable buffer for serverless
mongoose.set('strictQuery', true);

// Cache the connection promise to reuse across invocations in serverless
let cachedConnection = null;

const connectDB = async (retries = 3) => {
    try {
        // If already connected, return immediately
        if (mongoose.connection.readyState === 1) {
            console.log('[Connection] Already connected to MongoDB');
            return;
        }

        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('Missing MongoDB connection string. Set MONGODB_URI in your environment.');
        }

        // Log connection attempt
        console.log('[Connection] Starting MongoDB connection...');
        console.log('[Connection] Database:', mongoUri.split('/').pop().split('?')[0]);
        console.log('[Connection] Retries available:', retries);

        const mongoOptions = {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            maxPoolSize: process.env.VERCEL ? 1 : 5,
            minPoolSize: 0,
            maxIdleTimeMS: 60000,
            retryWrites: true,
            family: 4,
            waitQueueTimeoutMS: 30000
        };

        await mongoose.connect(mongoUri, mongoOptions);
        console.log('[Connection] ✅ MongoDB connected successfully');
        
        // Cache connection
        cachedConnection = mongoose.connection;
        return;
    } catch (err) {
        console.error(`[Connection] ❌ Error: ${err.message}`);

        if (retries > 0) {
            console.log(`[Connection] Retrying in 1 second... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return connectDB(retries - 1);
        }

        console.error('[Connection] ❌ Failed to connect after all retries');
        throw err;
    }
};

module.exports = { mongoose, connectDB };
const express = require('express');
const { connectDB, mongoose } = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    if (req.method === 'POST') console.log('Body:', req.body);
    next();
});

// Root endpoint for testing
app.get('/', (req, res) => {
    res.json({ message: 'CleanStreet API is running', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
    res.json({ message: 'CleanStreet API is running', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

let dbConnectionAttempt = false;

const requireDatabase = async (req, res, next) => {
    try {
        // If already connected, proceed
        if (mongoose.connection.readyState === 1) {
            return next();
        }

        // Try to connect on first request (only once)
        if (!dbConnectionAttempt) {
            dbConnectionAttempt = true;
            console.log('[DB] Attempting to connect to database on first request...');
            console.log('[DB] MongoDB URI available:', !!process.env.MONGODB_URI);
            console.log('[DB] Environment:', {
                VERCEL: !!process.env.VERCEL,
                NODE_ENV: process.env.NODE_ENV
            });
            try {
                await connectDB();
                console.log('[DB] Database connected successfully on first request');
            } catch (connectErr) {
                console.error('[DB] Connection failed:', connectErr.message);
                console.error('[DB] Stack:', connectErr.stack);
                dbConnectionAttempt = false; // Reset flag to allow retry on next request
                throw connectErr;
            }
        }

        // Check connection again after connection attempt
        if (mongoose.connection.readyState === 1) {
            return next();
        }

        const readyState = mongoose.connection.readyState;
        const stateNames = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
        console.warn(`[DB] Connection state: ${stateNames[readyState]} (${readyState})`);

        return res.status(503).json({
            message: 'Database unavailable. Please try again shortly.',
            connectionState: stateNames[readyState]
        });
    } catch (err) {
        console.error('[DB] Middleware error:', err.message);
        console.error('[DB] Stack:', err.stack);
        return res.status(503).json({
            message: 'Database unavailable. Please try again shortly.',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Wrapper for async middleware
const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.use('/api/auth', asyncMiddleware(requireDatabase), require('./routes/authRoutes'));
app.use('/api/complaints', asyncMiddleware(requireDatabase), require('./routes/complaintRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Initialize database and start listening
const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Failed to connect to database:', err.message);
        // Continue anyway for serverless, but log the error
    }
};

// For Vercel serverless - export the app
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    startServer().then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }).catch(err => {
        console.error('Server startup error:', err);
        process.exit(1);
    });
}
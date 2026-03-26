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
        // If connected, proceed
        if (mongoose.connection.readyState === 1) {
            console.log('[Middleware] Database already connected, proceeding...');
            return next();
        }

        // Only attempt connection once per function lifecycle
        if (!dbConnectionAttempt) {
            dbConnectionAttempt = true;
            console.log('[Middleware] First request - attempting database connection');
            
            try {
                await connectDB();
                console.log('[Middleware] ✅ Connection successful');
                return next();
            } catch (connectErr) {
                console.error('[Middleware] ❌ Connection failed:', connectErr.message);
                return res.status(503).json({
                    success: false,
                    message: 'Database connection failed. Please try again in a moment.',
                    error: process.env.NODE_ENV === 'development' ? connectErr.message : undefined
                });
            }
        }

        // If connection was attempted but not ready after a short wait
        const maxWaits = 5;
        let waitCount = 0;
        
        while (mongoose.connection.readyState !== 1 && waitCount < maxWaits) {
            console.log(`[Middleware] Waiting for connection... (${waitCount + 1}/${maxWaits})`);
            await new Promise(resolve => setTimeout(resolve, 500));
            waitCount++;
        }

        if (mongoose.connection.readyState === 1) {
            console.log('[Middleware] Connection ready after waiting');
            return next();
        }

        const stateNames = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
        console.error(`[Middleware] Connection timeout - state: ${stateNames[mongoose.connection.readyState]}`);
        
        return res.status(503).json({
            success: false,
            message: 'Database unavailable. Please try again shortly.',
            connectionState: stateNames[mongoose.connection.readyState]
        });
    } catch (err) {
        console.error('[Middleware] Unexpected error:', err.message);
        return res.status(503).json({
            success: false,
            message: 'Service temporarily unavailable.',
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
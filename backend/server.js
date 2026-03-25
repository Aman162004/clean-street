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
            console.log('Attempting to connect to database on first request...');
            console.log('MongoDB URI available:', !!process.env.MONGODB_URI);
            try {
                await connectDB();
                console.log('Database connected on first request');
            } catch (connectErr) {
                console.error('Database connection failed:', connectErr.message);
                dbConnectionAttempt = false; // Reset flag to allow retry on next request
                throw connectErr;
            }
        }

        // Check connection again after connection attempt
        if (mongoose.connection.readyState === 1) {
            return next();
        }

        return res.status(503).json({
            message: 'Database unavailable. Please try again shortly.'
        });
    } catch (err) {
        console.error('Database middleware error:', err.message);
        return res.status(503).json({
            message: 'Database unavailable. Please try again shortly.'
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
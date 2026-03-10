const express = require('express');
const { connectDB } = require('./config/db');
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

// Initialize database (non-blocking for serverless)
connectDB().catch(err => console.error('DB Init Error:', err.message));

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

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// For Vercel serverless - export the app
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
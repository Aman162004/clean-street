const { pool } = require('../config/db');

const initDB = async () => {
    try {
        console.log('Initializing database...');

        // Create users table first
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                location TEXT,
                role VARCHAR(50) DEFAULT 'citizen',
                profile_photo TEXT,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Users table created or already exists.');

        // Create complaints table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS complaints (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                priority VARCHAR(50) NOT NULL,
                address TEXT NOT NULL,
                landmark TEXT,
                description TEXT NOT NULL,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                status VARCHAR(50) DEFAULT 'Pending',
                photo TEXT,
                assigned_to VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Complaints table created or already exists.');
        console.log('✅ Database initialized successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
};

initDB();

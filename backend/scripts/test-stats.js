const { connectDB, mongoose } = require('../config/db');
require('../models/User');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

async function test() {
    try {
        await connectDB();

        let user = await User.findByEmail('citizen1@test.com');
        if (!user) {
            user = await User.create({
                name: 'Stats Test Citizen',
                email: 'citizen1@test.com',
                password: 'hashed-password-placeholder',
                role: 'citizen',
                location: 'Test Area',
                phone: '0000000000'
            });
        }

        console.log('Adding test complaint with user_id 10...');
        await Complaint.create({
            user_id: user.id,
            title: 'Test Pending Issue',
            type: 'garbage',
            priority: 'High',
            address: '123 Test St',
            description: 'Test description',
            latitude: 10.8505,
            longitude: 76.2711
        });

        console.log('Fetching stats...');
        const stats = await Complaint.getStats();
        console.log('STATS:', stats);

        await mongoose.connection.close();

        process.exit(0);
    } catch (e) {
        console.error('Test error:', e);
        await mongoose.connection.close();
        process.exit(1);
    }
}

test();

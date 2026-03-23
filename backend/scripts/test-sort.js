const { connectDB, mongoose } = require('../config/db');
require('../models/User');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

async function testSort() {
    try {
        await connectDB();
        console.log('Clearing existing complaints...');
        await mongoose.models.Complaint.deleteMany({});

        let user = await User.findByEmail('citizen1@test.com');
        if (!user) {
            user = await User.create({
                name: 'Sort Test Citizen',
                email: 'citizen1@test.com',
                password: 'hashed-password-placeholder',
                role: 'citizen',
                location: 'Test Area',
                phone: '0000000000'
            });
        }

        const priorities = ['Low', 'Critical', 'Medium', 'High'];
        for (const p of priorities) {
            console.log(`Adding ${p} priority complaint...`);
            await Complaint.create({
                user_id: user.id,
                title: `${p} Issue`,
                type: 'other',
                priority: p,
                address: 'Test Address',
                description: 'Test Description',
                latitude: 10.8505,
                longitude: 76.2711
            });
        }

        console.log('Fetching sorted complaints...');
        const sorted = await Complaint.findAll();
        console.log('--- SORTED RESULTS ---');
        sorted.forEach(c => console.log(`${c.priority}: ${c.title}`));

        await mongoose.connection.close();

        process.exit(0);
    } catch (e) {
        console.error('Test error:', e);
        await mongoose.connection.close();
        process.exit(1);
    }
}

testSort();

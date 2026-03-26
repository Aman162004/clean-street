require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        const vols = await mongoose.connection.db.collection('users').find({ role: 'volunteer' }).toArray();
        console.log('\n--- ALL VOLUNTEERS ---');
        vols.forEach(v => console.log(`Name: ${v.name} | Dept: ${v.department} | Active: ${v.is_active}`));
    } catch(err) { console.error(err); }
    process.exit(0);
});

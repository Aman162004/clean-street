const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function test() {
    try {
        console.log('--- Logging in as Citizen ---');
        // We will assume admin@gmail.com is Citizen or Admin but let's login as jal murga first
        
        // 1. Login as volunteer
        const loginRes = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'watersanitation@gmail.com', // jal murga (volunteer)
            password: 'Kannu@00'
        });
        const token = loginRes.data.token;
        const volId = loginRes.data.user.id;
        console.log('Volunteer logged in. ID:', volId);

        // We need to login as Admin to assign, or login as Citizen to create.
        const adminRes = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'admin@gmail.com',
            password: 'Kannu@00'
        });
        const adminToken = adminRes.data.token;
        
        console.log('Admin logged in.');

        // Get recent complaints to assign
        const statsRes = await axios.get('http://localhost:3001/api/complaints/stats', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        const recentComplaints = statsRes.data.recent;
        
        let targetComplaint = null;
        if (recentComplaints && recentComplaints.length > 0) {
            targetComplaint = recentComplaints[0];
            console.log('Assigning complaint', targetComplaint.id, 'to Volunteer...');
            await axios.post('http://localhost:3001/api/complaints/assign-volunteer', {
                complaintId: targetComplaint.id,
                volunteerId: volId
            }, { headers: { Authorization: `Bearer ${adminToken}` } });
        } else {
            console.error('No complaints exist in the DB at all to test!');
            return;
        }

        console.log(`Testing resolve on complaint: ${targetComplaint.id}`);

        // 3. Create dummy image
        const imgPath = path.join(__dirname, 'dummy.jpg');
        fs.writeFileSync(imgPath, Buffer.from('ffd8ffe000104a46494600010101006000600000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffdb0043010909090c0b0c180d0d1832211c2132323232323232323232323232323232', 'hex'));

        // 4. Send multipart request
        const FormData = require('form-data');
        const form = new FormData();
        form.append('proofPhoto', fs.createReadStream(imgPath));
        
        try {
            console.log('Sending Resolving Proof to API...');
            const resolveRes = await axios.post(`http://localhost:3001/api/complaints/${targetComplaint.id}/resolve`, form, {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Success!', resolveRes.data);
        } catch (err) {
            console.error('500 Error details:', err.response?.status, err.response?.data || err.message);
        }

        // Cleanup
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    } catch (err) {
        console.error('Test script outer error:', err.response?.status, err.response?.data || err.message);
    }
}
test();

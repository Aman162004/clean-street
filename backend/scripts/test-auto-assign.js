require('dotenv').config({ path: '../.env' }); // try root
require('dotenv').config({ path: './.env' }); // try backend
const { connectDB, mongoose } = require('../config/db');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const { createComplaint } = require('../controllers/complaintController');

async function testAutoAssign() {
    console.log('--- Starting Test ---');
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        console.log('WARNING: Real GEMINI_API_KEY not found in process.env. The classification will fallback to "Other".');
        console.log('Please add GEMINI_API_KEY to backend/.env if you want to test actual AI classification.');
    } else {
        console.log('GEMINI_API_KEY found, length:', process.env.GEMINI_API_KEY.length);
    }
    
    await connectDB();
    
    // Create dummy users
    const citizenEmail = `citizen_test_${Date.now()}@test.com`;
    const volEmail = `volunteer_test_${Date.now()}@test.com`;
    
    console.log('Creating mock users...');
    const citizen = await User.create({
        name: 'Test Citizen',
        email: citizenEmail,
        password: 'password123',
        role: 'citizen'
    });
    
    const volunteer = await User.create({
        name: 'Road Volunteer',
        email: volEmail,
        password: 'password123',
        role: 'volunteer',
        department: 'Roads & Transportation'
    });
    
    console.log(`Mock citizen ID: ${citizen.id}, Volunteer ID: ${volunteer.id}`);
    
    let responseData = null;
    let responseCode = null;
    
    // Mock req and res
    const req = {
        user: { id: citizen.id, role: 'citizen' },
        body: {
            title: "Giant pothole on Main St",
            description: "There is a massive pothole causing severe traffic and damaging cars near the intersection. Please fix it soon.",
            type: "Road",
            priority: "High",
            address: "Main St Intersection"
        }
    };
    
    const res = {
        status: function(code) {
            responseCode = code;
            return this;
        },
        json: function(data) {
            responseData = data;
        }
    };
    
    console.log('Testing createComplaint (Gemini auto-assignment)...');
    await createComplaint(req, res);
    
    console.log('Response Code:', responseCode);
    
    if (responseData && responseData.success) {
        const cId = responseData.data.id;
        const savedComplaint = await mongoose.connection.db.collection('complaints').findOne({_id: new mongoose.Types.ObjectId(cId)});
        if(!savedComplaint) {
            console.error('Test Failed: Could not find created complaint.');
        } else {
            console.log('--- Test Results ---');
            console.log('Assigned Department:', savedComplaint.department);
            console.log('Assigned Volunteer ID:', savedComplaint.assigned_to);
            console.log('Status:', savedComplaint.status);
            
            if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
                if(savedComplaint.department === 'Roads & Transportation' && String(savedComplaint.assigned_to) === String(volunteer.id)) {
                    console.log('✅ SUCCESS: Gemini classified the issue correctly and assigned it to the right volunteer.');
                } else {
                    console.error('❌ FAILURE: Gemini did not assign the issue correctly.', 'Expected: Roads & Transportation + ', volunteer.id);
                }
            } else {
                if(savedComplaint.department === 'Other' && savedComplaint.assigned_to === null) {
                    console.log('✅ SUCCESS: Fallback works. No assignment made when API key missing.');
                } else {
                    console.error('❌ FAILURE: Fallback failed. Unexpected values:', savedComplaint);
                }
            }
        }
    } else {
        console.error('createComplaint failed:', responseData);
    }

    // Cleanup
    console.log('Cleaning up DB...');
    if(responseData?.data?.id) {
        await mongoose.connection.db.collection('complaints').deleteOne({_id: new mongoose.Types.ObjectId(responseData.data.id)});
    }
    await mongoose.connection.db.collection('users').deleteOne({email: citizenEmail});
    await mongoose.connection.db.collection('users').deleteOne({email: volEmail});
    
    mongoose.connection.close();
    console.log('--- Test Finished ---');
}

testAutoAssign().catch(console.error);

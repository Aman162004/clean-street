const express = require('express');
const router = express.Router();
const {
	createComplaint,
	getAllComplaints,
	getUserComplaints,
	getDashboardStats,
	assignVolunteer,
	updateComplaintStatus,
	getVolunteerComplaints,
	upvoteComplaint,
	downvoteComplaint,
	addComplaintComment,
	getComplaintComments,
	resolveComplaint
} = require('../controllers/complaintController');
const { verifyToken } = require('../controllers/authController');
const { upload } = require('../middlewares/upload');

// Wrapper to catch multer errors cleanly as JSON
const handleUpload = (field) => (req, res, next) => {
    upload.single(field)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                message: err.message.includes('large') ? 'Image is too large (max 5MB)' : err.message 
            });
        }
        next();
    });
};

// All complaint routes are protected
router.post('/', verifyToken, handleUpload('photo'), createComplaint);
router.get('/', verifyToken, getAllComplaints);
router.get('/my-complaints', verifyToken, getUserComplaints);
router.get('/volunteer-complaints', verifyToken, getVolunteerComplaints);
router.get('/stats', verifyToken, getDashboardStats);
router.post('/:complaintId/upvote', verifyToken, upvoteComplaint);
router.post('/:complaintId/downvote', verifyToken, downvoteComplaint);
router.get('/:complaintId/comments', verifyToken, getComplaintComments);
router.post('/:complaintId/comments', verifyToken, addComplaintComment);

// Admin/Volunteer routes
router.post('/assign-volunteer', verifyToken, assignVolunteer);
router.put('/:complaintId/status', verifyToken, updateComplaintStatus);
router.post('/:complaintId/resolve', verifyToken, handleUpload('proofPhoto'), resolveComplaint);

module.exports = router;

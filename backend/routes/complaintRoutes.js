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
	getComplaintComments
} = require('../controllers/complaintController');
const { verifyToken } = require('../controllers/authController');
const { upload } = require('../middlewares/upload');

// All complaint routes are protected
router.post('/', verifyToken, upload.single('photo'), createComplaint);
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

module.exports = router;

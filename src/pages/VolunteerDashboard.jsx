import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, MapPin, Clock, CheckCircle2, AlertTriangle, User, Phone, Calendar, UploadCloud, X } from 'lucide-react';
import { api } from '../lib/api';

const VolunteerDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
    const [updating, setUpdating] = useState(null);
    const [resolvingId, setResolvingId] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    
    // Modal & Drag/Drop State
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchVolunteerComplaints();
        
        // Auto-refresh every 10 seconds to get latest updates
        const interval = setInterval(() => {
            // Background refresh without affecting loading state
            const fetchWithoutLoading = async () => {
                try {
                    const response = await api.get('/complaints/volunteer-complaints');
                    setComplaints(response.data || []);
                    
                    const total = response.data?.length || 0;
                    const pending = response.data?.filter(c => c.status === 'Pending')?.length || 0;
                    const inProgress = response.data?.filter(c => c.status === 'In Progress')?.length || 0;
                    const resolved = response.data?.filter(c => c.status === 'Resolved')?.length || 0;
                    
                    setStats({ total, pending, inProgress, resolved });
                } catch (err) {
                    console.error('Error refreshing volunteer complaints:', err);
                }
            };
            fetchWithoutLoading();
        }, 10000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchVolunteerComplaints = async () => {
        try {
            const response = await api.get('/complaints/volunteer-complaints');
            setComplaints(response.data || []);
            
            // Calculate stats
            const total = response.data?.length || 0;
            const pending = response.data?.filter(c => c.status === 'Pending')?.length || 0;
            const inProgress = response.data?.filter(c => c.status === 'In Progress')?.length || 0;
            const resolved = response.data?.filter(c => c.status === 'Resolved')?.length || 0;
            
            setStats({ total, pending, inProgress, resolved });
        } catch (err) {
            console.error('Error fetching volunteer complaints:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (complaintId, newStatus) => {
        setUpdating(complaintId);
        try {
            await api.put(`/complaints/${complaintId}/status`, { status: newStatus });
            // Refresh the list
            await fetchVolunteerComplaints();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status: ' + (err.message || 'Unknown error'));
        } finally {
            setUpdating(null);
        }
    };

    const handleStatusSelect = (complaintId, currentStatus, newStatus) => {
        if (newStatus === 'Resolved') {
            setResolvingId(complaintId);
            setShowUploadModal(true);
            return;
        }
        updateStatus(complaintId, newStatus);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleCloseModal = () => {
        setShowUploadModal(false);
        setResolvingId(null);
        setSelectedFile(null);
        fetchVolunteerComplaints(); // Reset dropdown visually
    };

    const confirmUpload = async () => {
        if (!selectedFile || !resolvingId) return;

        setShowUploadModal(false);
        setIsVerifying(true);
        setUpdating(resolvingId);
        try {
            const formData = new FormData();
            formData.append('proofPhoto', selectedFile);

            await api.post(`/complaints/${resolvingId}/resolve`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            await fetchVolunteerComplaints();
            alert("✨ AI successfully verified your proof! Issue marked as Resolved.");
        } catch (err) {
            console.error('Error resolving with proof:', err);
            alert(err.response?.data?.message || err.message || 'Failed to verify resolution.');
            fetchVolunteerComplaints();
        } finally {
            setIsVerifying(false);
            setUpdating(null);
            setResolvingId(null);
            setSelectedFile(null);
        }
    };

    const getPriorityBadge = (priority) => {
        const priorityMap = {
            'critical': 'danger',
            'high': 'warning',
            'medium': 'info',
            'low': 'success'
        };
        const badgeType = priorityMap[priority?.toLowerCase()] || 'secondary';
        return <span className={`badge bg-${badgeType}`}>{priority}</span>;
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-3 px-md-4 py-3">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-4">
                    <h1 className="display-5 fw-bold mb-2">
                        <ClipboardList className="me-3" size={48} />
                        Volunteer Dashboard
                    </h1>
                    <p className="text-muted">Manage your assigned complaints and update progress</p>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <ClipboardList size={32} className="text-primary mb-2" />
                                <h3 className="fw-bold">{stats.total}</h3>
                                <p className="text-muted mb-0">Total Assigned</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <Clock size={32} className="text-warning mb-2" />
                                <h3 className="fw-bold">{stats.pending}</h3>
                                <p className="text-muted mb-0">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <AlertTriangle size={32} className="text-info mb-2" />
                                <h3 className="fw-bold">{stats.inProgress}</h3>
                                <p className="text-muted mb-0">In Progress</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <CheckCircle2 size={32} className="text-success mb-2" />
                                <h3 className="fw-bold">{stats.resolved}</h3>
                                <p className="text-muted mb-0">Resolved</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complaints List */}
                <div className="card border-0 shadow">
                    <div className="card-header bg-white">
                        <h5 className="mb-0 fw-bold">Your Assigned Complaints</h5>
                    </div>
                    <div className="card-body">
                        {complaints.length === 0 ? (
                            <div className="text-center py-5">
                                <ClipboardList size={64} className="text-muted mb-3" />
                                <p className="text-muted">No complaints assigned to you yet.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Priority</th>
                                            <th>Status</th>
                                            <th>Citizen Info</th>
                                            <th>Location</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map((complaint) => (
                                            <tr key={complaint.id}>
                                                <td className="fw-bold">#{complaint.id}</td>
                                                <td>
                                                    <div className="fw-semibold">{complaint.title}</div>
                                                    <small className="text-muted">{complaint.description?.substring(0, 50)}...</small>
                                                </td>
                                                <td>
                                                    <span className="badge bg-secondary">{complaint.type}</span>
                                                </td>
                                                <td>{getPriorityBadge(complaint.priority)}</td>
                                                <td>
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={complaint.status || 'Pending'}
                                                        onChange={(e) => handleStatusSelect(complaint.id, complaint.status, e.target.value)}
                                                        disabled={updating === complaint.id || isVerifying}
                                                        style={{ minWidth: '130px' }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column gap-1">
                                                        <small className="d-flex align-items-center gap-1">
                                                            <User size={12} /> {complaint.user_name}
                                                        </small>
                                                        {complaint.user_phone && (
                                                            <small className="d-flex align-items-center gap-1 text-muted">
                                                                <Phone size={12} /> {complaint.user_phone}
                                                            </small>
                                                        )}
                                                        <small className="text-muted">{complaint.user_email}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <small className="d-flex align-items-center gap-1">
                                                        <MapPin size={12} />
                                                        {complaint.address?.substring(0, 30)}...
                                                    </small>
                                                    {complaint.landmark && (
                                                        <small className="text-muted">Near: {complaint.landmark}</small>
                                                    )}
                                                </td>
                                                <td>
                                                    <small className="d-flex align-items-center gap-1">
                                                        <Calendar size={12} />
                                                        {new Date(complaint.created_at).toLocaleDateString()}
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="card border-0 shadow mt-4 bg-light">
                    <div className="card-body">
                        <h6 className="fw-bold mb-2">Instructions:</h6>
                        <ul className="mb-0">
                            <li>Use the status dropdown to update complaint progress: Pending → In Progress → Resolved</li>
                            <li>Dashboard statistics will update in real-time as you change complaint statuses</li>
                            <li>Contact citizens using the provided phone number or email for any clarifications</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Hidden File Input used by the Modal */}
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/jpeg, image/png, image/webp, image/jpg" 
                capture="environment"
                onChange={handleFileSelect} 
            />

            {/* Upload Proof Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
                )}
            </AnimatePresence>

            {showUploadModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }} onClick={handleCloseModal}>
                    <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                        <motion.div 
                            className="modal-content border-0 shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className="modal-title fw-bold">Upload Resolution Proof</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body text-center p-4">
                                <p className="text-muted mb-4">
                                    Please provide a clear photo demonstrating that this civic issue has been resolved. <br/>
                                    <strong>Gemini Vision AI</strong> will analyze this image against the original complaint.
                                </p>

                                <div 
                                    className={`p-5 mb-4 rounded border-2 ${dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-dashed text-muted'} position-relative`}
                                    style={{ borderStyle: 'dashed', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {selectedFile ? (
                                        <div className="d-flex flex-column align-items-center">
                                            <CheckCircle2 size={48} className="text-success mb-2" />
                                            <span className="fw-semibold text-dark">{selectedFile.name}</span>
                                            <span className="small text-muted">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                            <p className="mt-2 text-primary small mb-0">Click to change file</p>
                                        </div>
                                    ) : (
                                        <>
                                            <UploadCloud size={48} className="mb-3 text-secondary" />
                                            <h6 className="fw-bold mb-1">Click to upload or drag and drop</h6>
                                            <p className="small mb-0">Max size 5MB (JPG, PNG, WEBP)</p>
                                        </>
                                    )}
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-primary btn-lg" 
                                        onClick={confirmUpload}
                                        disabled={!selectedFile}
                                    >
                                        {selectedFile ? 'Submit for AI Verification' : 'Please select a file'}
                                    </button>
                                    <button className="btn btn-light" onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Verification Loading Overlay */}
            {isVerifying && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999 }}>
                    <div className="spinner-border text-light mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                    <h4 className="text-white fw-bold">Gemini AI is analyzing your proof photo...</h4>
                    <p className="text-light">Please do not close this window.</p>
                </div>
            )}
        </div>
    );
};

export default VolunteerDashboard;

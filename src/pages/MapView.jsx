import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MapSection from '../components/MapSection';

function MapView() {
    const location = useLocation();
    const [typeFilters, setTypeFilters] = useState({ garbage: true, streetlight: true, pothole: true, water: true, other: true });
    const [statusFilters, setStatusFilters] = useState({ Pending: true, 'In Progress': true, Resolved: true });

    const updateTypeFilter = (key) => setTypeFilters(prev => ({ ...prev, [key]: !prev[key] }));
    const updateStatusFilter = (key) => setStatusFilters(prev => ({ ...prev, [key]: !prev[key] }));
    const focusLat = location.state?.focusLat ? Number(location.state.focusLat) : null;
    const focusLng = location.state?.focusLng ? Number(location.state.focusLng) : null;
    const focusPoint = (focusLat !== null && focusLng !== null && !Number.isNaN(focusLat) && !Number.isNaN(focusLng))
        ? { lat: focusLat, lng: focusLng }
        : null;

    return (
        <div className="container-fluid px-3 px-md-4 py-3">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-4">
                    <h1 className="display-5 fw-bold mb-2" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        <i className="bi bi-map me-3"></i>Interactive Map
                    </h1>
                    <p className="text-muted">View reported issues across your neighborhood</p>
                </div>

                <div className="row g-3">
                    {/* Map Section */}
                    <div className="col-12 col-lg-9">
                        <div style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}>
                            <MapSection focusPoint={focusPoint} typeFilters={typeFilters} statusFilters={statusFilters} />
                        </div>
                    </div>

                    {/* Legend and Filters */}
                    <div className="col-12 col-lg-3">
                        <div className="card border-0 shadow-sm rounded-3 mb-3" style={{ background: 'var(--bg-card)' }}>
                            <div className="card-body p-4">
                                <h5 className="fw-semibold mb-3">
                                    <i className="bi bi-funnel me-2 text-primary"></i>Filters
                                </h5>
                                <div className="d-flex flex-column gap-2">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="garbage"
                                            checked={typeFilters.garbage}
                                            onChange={() => updateTypeFilter('garbage')}
                                        />
                                        <label className="form-check-label" htmlFor="garbage">
                                            <i className="bi bi-trash text-danger me-2"></i>Garbage
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="streetlight"
                                            checked={typeFilters.streetlight}
                                            onChange={() => updateTypeFilter('streetlight')}
                                        />
                                        <label className="form-check-label" htmlFor="streetlight">
                                            <i className="bi bi-lightbulb text-warning me-2"></i>Street Lights
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="pothole"
                                            checked={typeFilters.pothole}
                                            onChange={() => updateTypeFilter('pothole')}
                                        />
                                        <label className="form-check-label" htmlFor="pothole">
                                            <i className="bi bi-exclamation-triangle text-info me-2"></i>Potholes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="water"
                                            checked={typeFilters.water}
                                            onChange={() => updateTypeFilter('water')}
                                        />
                                        <label className="form-check-label" htmlFor="water">
                                            <i className="bi bi-droplet text-primary me-2"></i>Water
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="other"
                                            checked={typeFilters.other}
                                            onChange={() => updateTypeFilter('other')}
                                        />
                                        <label className="form-check-label" htmlFor="other">
                                            <i className="bi bi-grid text-secondary me-2"></i>Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-3 mb-3" style={{ background: 'var(--bg-card)' }}>
                            <div className="card-body p-4">
                                <h5 className="fw-semibold mb-3"><i className="bi bi-filter-circle me-2 text-primary"></i>Status Filters</h5>
                                <div className="d-flex flex-column gap-2">
                                    {['Pending', 'In Progress', 'Resolved'].map(status => (
                                        <div className="form-check" key={status}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`status-${status}`}
                                                checked={statusFilters[status]}
                                                onChange={() => updateStatusFilter(status)}
                                            />
                                            <label className="form-check-label" htmlFor={`status-${status}`}>
                                                {status}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-3" style={{ background: 'var(--bg-card)' }}>
                            <div className="card-body p-4">
                                <h5 className="fw-semibold mb-3">
                                    <i className="bi bi-info-circle me-2 text-primary"></i>Map Legend
                                </h5>
                                <div className="d-flex flex-column gap-2 small">
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                        <span className="ms-2">Critical Issues</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                        <span className="ms-2">Pending Issues</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                        <span className="ms-2">Resolved Issues</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
export default MapView;
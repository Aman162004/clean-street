import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container py-5 px-4" style={{ maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="fw-bold text-body mb-3">Contact</h1>
                <p className="text-muted mb-5">
                    Questions, feedback, or partnership ideas? Reach out—we read every message.
                </p>

                <div className="row g-4">
                    <div className="col-lg-5">
                        <div
                            className="rounded-4 p-4 h-100 border"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            <div className="d-flex align-items-start gap-3 mb-4">
                                <Mail className="text-success flex-shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="fw-semibold text-body small">Email</div>
                                    <a href="mailto:support@cleanstreet.local" className="text-muted text-decoration-none small">
                                        support@cleanstreet.local
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mb-4">
                                <Phone className="text-success flex-shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="fw-semibold text-body small">Phone</div>
                                    <span className="text-muted small">+1 (555) 010-2030</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3">
                                <MapPin className="text-success flex-shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="fw-semibold text-body small">Office</div>
                                    <span className="text-muted small">Civic Tech Hub, Community Services</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        {submitted ? (
                            <div
                                className="rounded-4 p-5 border text-center h-100 d-flex align-items-center justify-content-center"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderColor: 'var(--border-color)',
                                    minHeight: '280px',
                                }}
                            >
                                <div>
                                    <p className="fw-semibold text-body mb-2">Thanks for your message.</p>
                                    <p className="text-muted small mb-0">We’ll get back to you as soon as we can.</p>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-4 p-4 p-lg-5 border"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderColor: 'var(--border-color)',
                                }}
                            >
                                <div className="mb-3">
                                    <label htmlFor="contact-name" className="form-label small fw-semibold text-body">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        className="form-control"
                                        required
                                        autoComplete="name"
                                        style={{ backgroundColor: 'var(--form-input-bg)', color: 'var(--text-primary)' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact-email" className="form-label small fw-semibold text-body">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        className="form-control"
                                        required
                                        autoComplete="email"
                                        style={{ backgroundColor: 'var(--form-input-bg)', color: 'var(--text-primary)' }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="contact-msg" className="form-label small fw-semibold text-body">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-msg"
                                        className="form-control"
                                        rows={4}
                                        required
                                        style={{ backgroundColor: 'var(--form-input-bg)', color: 'var(--text-primary)' }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn w-100 py-2 fw-semibold text-white border-0 rounded-3"
                                    style={{
                                        background: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
                                    }}
                                >
                                    Send message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;

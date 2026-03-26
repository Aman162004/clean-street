import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Book, Zap } from 'lucide-react';

const Help = () => {
    const [expandedItem, setExpandedItem] = useState(0);

    const faqs = [
        {
            q: 'How do I report an issue as a citizen?',
            a: 'Create an account or log in. Go to your citizen dashboard and click "Report Issue". Select a location on the map, add a photo (optional), describe the problem, and submit. Your report will be visible to volunteers and administrators who will take action.'
        },
        {
            q: 'How do volunteers get assigned to issues?',
            a: 'The system automatically assigns nearby issues to registered volunteers based on location and availability. Volunteers can also manually pick issues they want to handle from the "Available Assignments" section in their dashboard.'
        },
        {
            q: 'Can I track the progress of my reported issue?',
            a: `Yes! After reporting an issue, you can view its status in real-time. Status updates include: Submitted → Assigned → In Progress → Resolved. You'll receive notifications at each stage.`
        },
        {
            q: 'What roles are available on CleanStreet?',
            a: 'There are three main roles: Citizen (report issues), Volunteer (resolve issues), and Admin (manage platform and users). You can sign up for multiple roles if needed.'
        },
        {
            q: 'How do I change my password or profile information?',
            a: 'After logging in, click on your profile icon in the top-right corner and select "Settings" or "Profile". You can update your name, email, phone, profile picture, and password from there.'
        },
        {
            q: 'I forgot my password. What should I do?',
            a: 'On the login page, click "Forgot Password?" and enter your email. You\'ll receive instructions on how to reset your password. If you don\'t receive the email, check your spam folder.'
        },
        {
            q: 'What kind of issues can I report?',
            a: 'You can report issues related to street cleanliness, potholes, broken infrastructure, illegal dumping, stray animals, street lights, water leaks, and other civic concerns. Use photos for clarity!'
        },
        {
            q: 'Is my location data private?',
            a: 'Your precise location is used by volunteers to reach the site. You only share the specific complaint location, not your home address. All data is encrypted and protected.'
        },
        {
            q: 'Something is not working correctly. How do I report a bug?',
            a: 'Contact us at support@cleanstreet.local with details of what you were doing, screenshots if possible, and any error messages you saw. We typically respond within 24 hours.'
        },
        {
            q: 'Can I delete my account?',
            a: 'Yes, you can request account deletion from Settings > Privacy. Your reports and activity history will be anonymized but maintained for transparency records.'
        }
    ];

    const resources = [
        { icon: Book, title: 'Getting Started', description: 'New to CleanStreet? Learn how to sign up and make your first report.' },
        { icon: MessageCircle, title: 'Contact Support', description: 'Have a question not answered here? Email us at support@cleanstreet.local' },
        { icon: Zap, title: 'Best Practices', description: 'Tips on how to report issues effectively and help our volunteers respond faster.' }
    ];

    return (
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Hero Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-uppercase small fw-bold mb-3" style={{
                            color: 'var(--primary-main)',
                            letterSpacing: '1.5px'
                        }}>
                            Help & Support
                        </p>
                        <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            How Can We <span style={{ color: 'var(--primary-main)' }}>Help You?</span>
                        </h1>
                        <p className="lead" style={{
                            color: 'var(--text-secondary)',
                            maxWidth: '32rem',
                            margin: '0 auto',
                            fontSize: '1.15rem'
                        }}>
                            Find answers to common questions about CleanStreet and learn how to get the most out of the platform.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Quick Resources */}
            <section className="py-5 px-4">
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="row g-4 mb-5">
                        {resources.map((resource, idx) => {
                            const Icon = resource.icon;
                            return (
                                <motion.div
                                    key={resource.title}
                                    className="col-md-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                                >
                                    <div className="rounded-lg p-4" style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        border: `2px solid var(--primary-main)`,
                                        textAlign: 'center',
                                        height: '100%'
                                    }}>
                                        <div className="mb-3 d-inline-flex align-items-center justify-content-center" style={{
                                            width: '56px',
                                            height: '56px',
                                            backgroundColor: 'var(--primary-main)',
                                            color: 'white',
                                            borderRadius: '12px'
                                        }}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>{resource.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{resource.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Frequently Asked <span style={{ color: 'var(--primary-main)' }}>Questions</span>
                        </h2>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        {faqs.map(({ q, a }, idx) => (
                            <motion.div
                                key={q}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.02 * idx, duration: 0.3 }}
                            >
                                <button
                                    onClick={() => setExpandedItem(expandedItem === idx ? -1 : idx)}
                                    className="w-100 rounded-lg p-4 text-start border-0"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        border: `2px solid ${expandedItem === idx ? 'var(--primary-main)' : 'var(--border-primary)'}`,
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-normal)',
                                        boxShadow: expandedItem === idx ? 'var(--shadow-md)' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary-main)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (expandedItem !== idx) {
                                            e.currentTarget.style.borderColor = 'var(--border-primary)';
                                        }
                                    }}
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3 className="fw-bold mb-0" style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{q}</h3>
                                        <ChevronDown
                                            size={20}
                                            style={{
                                                color: 'var(--primary-main)',
                                                transform: expandedItem === idx ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform var(--transition-normal)',
                                                flexShrink: 0
                                            }}
                                        />
                                    </div>
                                </button>

                                {expandedItem === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-lg p-4 mt-2"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            borderLeft: '4px solid var(--primary-main)'
                                        }}
                                    >
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>{a}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 px-4">
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center rounded-lg p-5"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: `2px solid var(--primary-main)`,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Still Need <span style={{ color: 'var(--primary-main)' }}>Help?</span>
                        </h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            marginBottom: '2rem',
                            maxWidth: '32rem',
                            margin: '0 auto 2rem'
                        }}>
                            Our support team is ready to assist you. Reach out with any questions or feedback.
                        </p>
                        <Link
                            to="/contact"
                            className="btn btn-lg fw-bold rounded-lg text-white border-0"
                            style={{
                                backgroundColor: 'var(--primary-main)',
                                padding: '0.75rem 2rem'
                            }}
                        >
                            Contact Support
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Help;

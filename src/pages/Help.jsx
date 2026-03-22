import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Help = () => {
    const items = [
        {
            q: 'How do I report an issue?',
            a: 'Create an account or log in, then use Report Issue from your dashboard. Add a location, description, and optional photos.',
        },
        {
            q: 'Who can see my reports?',
            a: 'Authorized staff and volunteers use reports to coordinate response. Avoid sharing sensitive personal information in public fields.',
        },
        {
            q: 'How do I change my password or profile?',
            a: 'After logging in, open Settings or Profile from the sidebar to update your details.',
        },
        {
            q: 'Something is not working. What should I do?',
            a: 'Try refreshing the page or clearing your browser cache. If the problem continues, contact us with what you were doing and any error message you see.',
        },
    ];

    return (
        <div className="container py-5 px-4" style={{ maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="fw-bold text-body mb-3">Help</h1>
                <p className="text-muted mb-4">
                    Quick answers about using CleanStreet. For account access, visit{' '}
                    <Link to="/login/citizen" className="fw-semibold">
                        Login
                    </Link>{' '}
                    (citizen / volunteer / admin from the menu) or{' '}
                    <Link to="/signup/citizen" className="fw-semibold">
                        Register
                    </Link>
                    .
                </p>
                <div className="d-flex flex-column gap-4">
                    {items.map(({ q, a }) => (
                        <div
                            key={q}
                            className="rounded-4 p-4 border"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            <h2 className="h6 fw-bold text-body mb-2">{q}</h2>
                            <p className="text-muted mb-0 small" style={{ lineHeight: 1.7 }}>
                                {a}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Help;

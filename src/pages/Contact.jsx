import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'support@cleanstreet.local',
            href: 'mailto:support@cleanstreet.local'
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+91 (11) 1234-5678',
            href: 'tel:+911112345678'
        },
        {
            icon: MapPin,
            title: 'Office',
            content: 'Civic Tech Hub, New Delhi',
            href: '#'
        },
        {
            icon: Clock,
            title: 'Hours',
            content: 'Mon - Fri, 9 AM - 6 PM',
            href: '#'
        }
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
                            Get in Touch
                        </p>
                        <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            We'd Love to Hear <span style={{ color: 'var(--primary-main)' }}>From You</span>
                        </h1>
                        <p className="lead" style={{
                            color: 'var(--text-secondary)',
                            maxWidth: '32rem',
                            margin: '0 auto',
                            fontSize: '1.15rem'
                        }}>
                            Have questions, feedback, or partnership ideas? Contact us—we read every message and respond within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-5 px-4">
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="row g-4">
                        {contactInfo.map((info, idx) => {
                            const Icon = info.icon;
                            return (
                                <motion.div
                                    key={info.title}
                                    className="col-md-6 col-lg-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                                >
                                    <div className="rounded-lg p-4" style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        border: `2px solid var(--primary-main)`,
                                        textAlign: 'center',
                                        transition: 'var(--transition-normal)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
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
                                        <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>{info.title}</h3>
                                        {info.href !== '#' ? (
                                            <a href={info.href} style={{ 
                                                color: 'var(--primary-main)', 
                                                textDecoration: 'none',
                                                fontSize: '0.95rem'
                                            }} className="fw-semibold">
                                                {info.content}
                                            </a>
                                        ) : (
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                                                {info.content}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                    Send us a <span style={{ color: 'var(--primary-main)' }}>Message</span>
                                </h2>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.8',
                                    marginBottom: '1.5rem'
                                }}>
                                    Whether you're a citizen with feedback, a volunteer seeking opportunities, or an organization interested in partnering with CleanStreet, we want to hear from you.
                                </p>
                                <ul style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.95rem',
                                    lineHeight: '2'
                                }}>
                                    <li>✓ Report technical issues</li>
                                    <li>✓ Share feedback and suggestions</li>
                                    <li>✓ Explore partnership opportunities</li>
                                    <li>✓ Join our team</li>
                                </ul>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.form
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                onSubmit={handleSubmit}
                                className="rounded-lg p-5"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `1px solid var(--border-primary)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                {submitted && (
                                    <div className="mb-4 rounded-lg p-3" style={{
                                        backgroundColor: 'var(--primary-main)',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}>
                                        ✓ Message sent successfully! We'll be in touch soon.
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: 'var(--text-primary)' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--text-primary)'
                                        }}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: 'var(--text-primary)' }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--text-primary)'
                                        }}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: 'var(--text-primary)' }}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--text-primary)'
                                        }}
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold" style={{ color: 'var(--text-primary)' }}>
                                        Message
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--text-primary)'
                                        }}
                                        placeholder="Your message..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg w-100 fw-bold rounded-lg text-white border-0"
                                    style={{
                                        backgroundColor: 'var(--primary-main)',
                                        transition: 'var(--transition-normal)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Send Message
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

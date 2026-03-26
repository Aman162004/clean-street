import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, MapPin, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    const values = [
        {
            icon: Target,
            title: 'Transparency',
            description: 'Every issue reported is tracked openly so citizens know exactly where their complaint stands.'
        },
        {
            icon: Users,
            title: 'Community-First',
            description: 'We empower residents and local teams to collaborate and solve problems together.'
        },
        {
            icon: Zap,
            title: 'Speed & Action',
            description: 'Quick reporting and rapid assignment mean faster resolution and cleaner neighborhoods.'
        },
        {
            icon: Shield,
            title: 'Accountability',
            description: 'Both citizens and teams are accountable—requests are logged, timestamped, and verified.'
        }
    ];

    const stats = [
        { number: '1000+', label: 'Issues Reported' },
        { number: '500+', label: 'Active Volunteers' },
        { number: '95%', label: 'Resolution Rate' },
        { number: '24/7', label: 'Availability' }
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
                    >
                        <div className="text-center">
                            <p className="text-uppercase small fw-bold mb-3" style={{
                                color: 'var(--primary-main)',
                                letterSpacing: '1.5px'
                            }}>
                                About CleanStreet
                            </p>
                            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                Building Cleaner, Safer <span style={{ color: 'var(--primary-main)' }}>Communities Together</span>
                            </h1>
                            <p className="lead" style={{
                                color: 'var(--text-secondary)',
                                maxWidth: '32rem',
                                margin: '0 auto',
                                fontSize: '1.15rem'
                            }}>
                                CleanStreet is a civic platform that connects residents, volunteers, and administrators to report, track, and resolve neighborhood issues in real-time.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-5 px-4">
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-uppercase small fw-bold mb-3" style={{
                                    color: 'var(--primary-main)',
                                    letterSpacing: '1.5px'
                                }}>
                                    Our Mission
                                </p>
                                <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                    Empower Every Citizen to<span style={{ color: 'var(--primary-main)', display: 'block' }}>Keep Their Community Clean</span>
                                </h2>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.8',
                                    marginBottom: '1.5rem'
                                }}>
                                    We believe that clean, safe neighborhoods are a right, not a privilege. By providing a simple, transparent reporting system, we empower everyday citizens to identify problems and ensure local teams address them promptly. Every report matters. Every voice counts.
                                </p>
                                <Link
                                    to="/report-issue"
                                    className="btn btn-lg fw-bold rounded-lg text-white border-0"
                                    style={{
                                        backgroundColor: 'var(--primary-main)',
                                        padding: '0.75rem 2rem',
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
                                    Report an Issue
                                </Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-lg overflow-hidden d-flex"
                                style={{
                                    backgroundColor: 'var(--bg-surface)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-lg)',
                                    height: '350px'
                                }}
                            >
                                <img 
                                    src="/aboutus.png" 
                                    alt="Mission Image" 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        flex: 1
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="text-center mb-5">
                        <p className="text-uppercase small fw-bold mb-3" style={{
                            color: 'var(--primary-main)',
                            letterSpacing: '1.5px'
                        }}>
                            Core Values
                        </p>
                        <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            What Drives <span style={{ color: 'var(--primary-main)' }}>CleanStreet</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    className="col-md-6 col-lg-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                                >
                                    <div className="h-100 rounded-lg p-4" style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        border: `2px solid var(--primary-main)`,
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'var(--transition-normal)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    }}>
                                        <div className="mb-3" style={{
                                            width: '56px',
                                            height: '56px',
                                            backgroundColor: 'var(--primary-main)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>{value.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-5 px-4">
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Our <span style={{ color: 'var(--primary-main)' }}>Impact</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.number}
                                className="col-md-6 col-lg-3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                            >
                                <div className="text-center rounded-lg p-4" style={{
                                    backgroundColor: 'var(--bg-surface)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}>
                                    <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-main)' }}>
                                        {stat.number}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Ready to Make a <span style={{ color: 'var(--primary-main)' }}>Difference?</span>
                        </h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            marginBottom: '2rem',
                            maxWidth: '32rem',
                            margin: '0 auto 2rem'
                        }}>
                            Join thousands of citizens, volunteers, and administrators creating cleaner, safer communities.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link
                                to="/signup/citizen"
                                className="btn btn-lg fw-bold rounded-lg text-white border-0"
                                style={{
                                    backgroundColor: 'var(--primary-main)',
                                    padding: '0.75rem 2rem'
                                }}
                            >
                                Get Started as Citizen
                            </Link>
                            <Link
                                to="/signup/volunteer"
                                className="btn btn-lg fw-bold rounded-lg border-2"
                                style={{
                                    borderColor: 'var(--primary-main)',
                                    color: 'var(--primary-main)',
                                    backgroundColor: 'transparent',
                                    padding: '0.75rem 2rem'
                                }}
                            >
                                Join as Volunteer
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Camera, BarChart3, Users } from 'lucide-react';
import HalideLanding from '../components/ui/halide-topo-hero';

const Home = () => {
    const [email, setEmail] = useState('');
    const [subscribeMessage, setSubscribeMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    // ADD IMAGE PATHS HERE (4 images)
    const imageTiles = [
        { src: '/citizen_potholes.png', alt: 'Description 1' },
        { src: '/volunteer_garbage.png', alt: 'Description 2' },
        { src: '/admin_approve.png', alt: 'Description 3' },
        { src: '/success.png', alt: 'Description 4' },
    ];

    const roleTiles = [
        {
            title: 'Citizen',
            blurb: 'Report issues and follow fixes in your area.',
            loginTo: '/login/citizen',
            registerTo: '/signup/citizen',
        },
        {
            title: 'Volunteer',
            blurb: 'Handle assignments and update progress in the field.',
            loginTo: '/login/volunteer',
            registerTo: '/signup/volunteer',
        },
        {
            title: 'Admin',
            blurb: 'Manage users, complaints, and system settings.',
            loginTo: '/login/admin',
            registerTo: '/signup/admin',
        },
    ];

    const features = [
        {
            icon: MapPin,
            title: 'Report on the map',
            text: 'Pin issues on an interactive map so crews know exactly where help is needed.',
        },
        {
            icon: Camera,
            title: 'Photo evidence',
            text: 'Attach photos to complaints so problems are clear and actionable.',
        },
        {
            icon: BarChart3,
            title: 'Track progress',
            text: 'Follow status from submitted to resolved with transparent updates.',
        },
        {
            icon: Users,
            title: 'Community & volunteers',
            text: 'Citizens, volunteers, and admins work together on one platform.',
        },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribeMessage('✓ Thank you! Check your email for updates.');
            setShowMessage(true);
            setEmail('');
            setTimeout(() => {
                setShowMessage(false);
            }, 4000);
        }
    };

    return (
        <>
            {/* Immersive Delhi map hero */}
            <section className="position-relative" style={{ minHeight: '100vh', backgroundColor: '#0a1f3e' }}>
                <HalideLanding />
            </section>

            <div className="overflow-hidden home-page">
            <section
                className="home-hero-fold border-bottom px-3 px-md-4"
                style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderBottomColor: 'var(--border-primary)',
                }}
            >
                <div className="container pt-0 pb-5" style={{ maxWidth: '1100px' }}>
                    <p className="home-slogan text-center px-2 mt-4 mb-5" style={{
                        fontSize: '2.2rem',
                        fontWeight: '800',
                        color: 'var(--primary-main)',
                        letterSpacing: '1px',
                        lineHeight: '1.2'
                    }}>
                        Report. Resolve. Revive.
                    </p>

                    {/* 3 Role Tiles Section - Square Tiles in One Line */}
                    <div className="row g-3 mb-5 justify-content-center">
                        {roleTiles.map(({ title, loginTo, registerTo }, idx) => {
                            const roleIcons = {
                                'Citizen': '👤',
                                'Volunteer': '🙋',
                                'Admin': '⚙️'
                            };
                            return (
                            <motion.div 
                                key={title} 
                                className="col-sm-6 col-md-4 col-lg-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (idx + 1), duration: 0.5 }}
                            >
                                <div className="home-role-square-tile rounded-lg" style={{
                                    backgroundColor: 'var(--bg-surface)',
                                    border: `3px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'all var(--transition-normal)',
                                    height: '280px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.style.borderColor = 'var(--primary-main)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.style.borderColor = 'var(--primary-main)';
                                }}>
                                    <div style={{
                                        fontSize: '3.5rem',
                                        lineHeight: '1',
                                        marginBottom: '1rem'
                                    }}>
                                        {roleIcons[title]}
                                    </div>
                                    <h3 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>{title}</h3>
                                    <div className="d-flex flex-column gap-2 w-100 mt-auto">
                                        <Link
                                            to={loginTo}
                                            className="btn btn-sm fw-bold rounded-lg py-2"
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderColor: 'var(--primary-main)',
                                                border: '2px solid',
                                                color: 'var(--primary-main)',
                                                transition: 'var(--transition-fast)',
                                                fontSize: '0.95rem'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = 'var(--primary-main)';
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = 'var(--primary-main)';
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to={registerTo}
                                            className="btn btn-sm fw-bold rounded-lg py-2 text-white border-0"
                                            style={{
                                                backgroundColor: 'var(--primary-main)',
                                                boxShadow: 'var(--shadow-sm)',
                                                transition: 'var(--transition-fast)',
                                                fontSize: '0.95rem'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = 'var(--shadow-md)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'var(--shadow-sm)';
                                            }}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                className="position-relative py-5 px-4"
                style={{
                    background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
                    minHeight: 'min(50vh, calc(100vh - var(--public-navbar-height, 88px)))',
                }}
            >
                <div className="container position-relative" style={{ maxWidth: '1100px' }}>
                    <div className="row align-items-center gy-5">
                        <div className="col-lg-7">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                            >
                                <p className="text-uppercase small fw-bold mb-3" style={{
                                    color: 'var(--primary-main)',
                                    letterSpacing: '1.5px'
                                }}>
                                    Cleaner streets, together
                                </p>
                                <h1 className="display-5 fw-bold mb-4 lh-sm" style={{ color: 'var(--text-primary)' }}>
                                    Report civic issues.{' '}
                                    <span style={{ color: 'var(--primary-main)' }}>
                                        See them resolved.
                                    </span>
                                </h1>
                                <p className="lead mb-5" style={{
                                    maxWidth: '32rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6'
                                }}>
                                    CleanStreet connects residents with local teams to track garbage, hazards, and
                                    maintenance—so your neighborhood stays safe and clean.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link
                                        to="/signup/citizen"
                                        className="btn btn-lg px-5 py-3 rounded-lg fw-semibold text-white border-0"
                                        style={{
                                            backgroundColor: 'var(--primary-main)',
                                            boxShadow: 'var(--shadow-lg)',
                                            transition: 'var(--transition-normal)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = 'var(--shadow-xl)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'var(--shadow-lg)';
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                    <Link 
                                        to="/about" 
                                        className="btn btn-lg px-5 py-3 rounded-lg fw-semibold border-2"
                                        style={{
                                            borderColor: 'var(--primary-main)',
                                            color: 'var(--primary-main)',
                                            backgroundColor: 'transparent',
                                            transition: 'var(--transition-fast)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = 'var(--primary-main)';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = 'var(--primary-main)';
                                        }}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-lg p-4 p-lg-5"
                                style={{
                                    backgroundColor: 'var(--bg-surface)',
                                    border: `1px solid var(--border-primary)`,
                                    boxShadow: 'var(--shadow-lg)',
                                    transition: 'var(--transition-normal)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                }}
                            >
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="rounded-lg d-flex align-items-center justify-content-center text-white flex-shrink-0"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            backgroundColor: 'var(--primary-main)',
                                        }}
                                    >
                                        <BarChart3 size={28} />
                                    </div>
                                    <div>
                                        <p className="fw-semibold mb-0" style={{ color: 'var(--text-primary)' }}>Live Overview</p>
                                        <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>Complaints and resolution flow</p>
                                    </div>
                                </div>
                                <div className="row g-2 text-center small">
                                    <div className="col-4">
                                        <div className="rounded-lg py-3" style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: `1px solid var(--border-primary)`,
                                            transition: 'var(--transition-fast)'
                                        }}>
                                            <div className="fw-bold fs-5" style={{ color: 'var(--primary-main)' }}>24/7</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Reporting</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="rounded-lg py-3" style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: `1px solid var(--border-primary)`,
                                            transition: 'var(--transition-fast)'
                                        }}>
                                            <div className="fw-bold fs-5" style={{ color: 'var(--primary-main)' }}>Map</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pin Issues</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="rounded-lg py-3" style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            border: `1px solid var(--border-primary)`,
                                            transition: 'var(--transition-fast)'
                                        }}>
                                            <div className="fw-bold fs-5" style={{ color: 'var(--primary-main)' }}>Track</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Status</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 px-4" style={{
                backgroundColor: 'var(--bg-primary)',
            }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Why <span style={{ color: 'var(--primary-main)' }}>CleanStreet</span>
                        </h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            maxWidth: '36rem',
                            margin: '0 auto',
                            fontSize: '1.1rem'
                        }}>
                            Everything you need to report problems and stay informed—without phone tag or lost tickets.
                        </p>
                    </div>
                    <div className="row g-4">
                        {features.map(({ icon: Icon, title, text }, i) => (
                            <div key={title} className="col-md-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                                    className="h-100 rounded-lg p-5"
                                    style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        border: `1px solid var(--border-primary)`,
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
                                    }}
                                >
                                    {/* Top accent border */}
                                    <div 
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '4px',
                                            backgroundColor: 'var(--primary-main)'
                                        }}
                                    />
                                    
                                    <div
                                        className="rounded-lg d-inline-flex align-items-center justify-content-center mb-4 text-white"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            backgroundColor: 'var(--primary-main)',
                                        }}
                                    >
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                                    <p className="small mb-0" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{text}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Impact Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="text-center mb-5">
                        <p className="text-uppercase small fw-bold mb-3" style={{
                            color: 'var(--primary-main)',
                            letterSpacing: '1.5px'
                        }}>
                            Community Impact
                        </p>
                        <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            Making a Real <span style={{ color: 'var(--primary-main)' }}>Difference</span>
                        </h2>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-3 col-sm-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="text-center rounded-lg p-4"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-main)' }}>2500+</div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>Issues Resolved</p>
                            </motion.div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="text-center rounded-lg p-4"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-main)' }}>98%</div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>User Satisfaction</p>
                            </motion.div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="text-center rounded-lg p-4"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-main)' }}>48h</div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>Avg Resolution Time</p>
                            </motion.div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="text-center rounded-lg p-4"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-main)' }}>12</div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>Cities Covered</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="rounded-lg p-5"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="mb-3" style={{
                                    fontSize: '1.5rem'
                                }}>★★★★★</div>
                                <p style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '1.05rem',
                                    fontStyle: 'italic',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.8'
                                }}>
                                    "CleanStreet made it so easy to report the broken streetlight near my home. Within two days, a volunteer came and fixed it. I love how transparent the process is!"
                                </p>
                                <div>
                                    <p className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Priya Sharma</p>
                                    <p className="small" style={{ color: 'var(--text-secondary)' }}>Citizen • Delhi</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="rounded-lg p-5"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: `2px solid var(--primary-main)`,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <div className="mb-3" style={{
                                    fontSize: '1.5rem'
                                }}>★★★★★</div>
                                <p style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '1.05rem',
                                    fontStyle: 'italic',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.8'
                                }}>
                                    "As a volunteer, CleanStreet has given me a structured way to contribute to my community. The app makes assignments clear and keeps everyone updated."
                                </p>
                                <div>
                                    <p className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Rajesh Patel</p>
                                    <p className="small" style={{ color: 'var(--text-secondary)' }}>Volunteer • Mumbai</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-lg p-5"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-main) 0%, #059669 100%)',
                            textAlign: 'center'
                        }}
                    >
                        <h1  style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Stay Updated
                        </h1>
                        <br></br>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.1rem',
                            marginBottom: '2rem',
                            maxWidth: '32rem',
                            margin: '0 auto 2rem'
                        }}>
                            Get the latest updates on community improvements and civic initiatives in your area.
                        </p>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    maxWidth: '300px',
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <button
                                onClick={handleSubscribe}
                                className="btn btn-lg fw-bold rounded-lg text-white border-0"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    padding: '0.5rem 1.5rem',
                                    transition: 'var(--transition-normal)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                        {showMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 p-3 rounded-lg"
                                style={{
                                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                    border: '1px solid rgba(34, 197, 94, 0.4)',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '0.95rem',
                                    fontWeight: '500'
                                }}
                            >
                                {subscribeMessage}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Image Showcase Section */}
            <section className="py-5 px-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                            See <span style={{ color: 'var(--primary-main)' }}>CleanStreet</span> in Action
                        </h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            maxWidth: '36rem',
                            margin: '0 auto',
                            fontSize: '1.1rem'
                        }}>
                            Visual glimpse of how citizens report, volunteers act, and communities prosper.
                        </p>
                    </div>
                    
                    {/* 4 Image Tiles - Responsive Grid */}
                    <div className="row g-3">
                        {imageTiles.map((img, index) => (
                            <motion.div 
                                key={index} 
                                className="col-md-6 col-lg-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                            >
                                <div className="rounded-lg overflow-hidden" 
                                     style={{ 
                                         backgroundColor: 'var(--bg-secondary)',
                                         border: `3px solid var(--primary-main)`,
                                         aspectRatio: '16 / 10',
                                         width: '100%',
                                         boxShadow: 'var(--shadow-md)',
                                         transition: 'var(--transition-normal)',
                                         cursor: 'pointer'
                                     }}
                                     onMouseEnter={(e) => {
                                         e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                                         e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                     }}
                                     onMouseLeave={(e) => {
                                         e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                         e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                     }}>
                                    <img 
                                        src={img.src} 
                                        alt={img.alt} 
                                        className="w-100 h-100 object-fit-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800?text='+img.alt; }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
        </>
    );
};

export default Home;

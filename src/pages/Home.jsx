import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Camera, BarChart3, Users } from 'lucide-react';

const Home = () => {
    // ADD IMAGE PATHS HERE (4 images)
    const imageTiles = [
        { src: '/citizen.png', alt: 'Description 1' },
        { src: '/volunteer.png', alt: 'Description 2' },
        { src: '/before_after.png', alt: 'Description 3' },
        { src: '/data.png', alt: 'Description 4' },
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

    return (
        <div className="overflow-hidden home-page">
            <section
                className="home-hero-fold border-bottom px-3 px-md-4"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                }}
            >
                <div className="container pt-0 pb-5" style={{ maxWidth: '1100px' }}>
                    <p className="home-slogan text-center px-2 mt-0 mb-4">Report. Resolve. Revive.</p>
                    
                    {/* 4 Image Tiles Section: 2x2 grid to make them bigger */}
                    <div className="row g-4 mb-5 justify-content-center">
                        {imageTiles.map((img, index) => (
                            <div key={index} className="col-md-6 col-lg-6">
                                {/* RECTANGULAR & BIGGER SIZE: Using col-md-6 for large tiles */}
                                <div className="rounded-4 overflow-hidden shadow-sm mx-auto" 
                                     style={{ 
                                         backgroundColor: 'var(--card-bg)', 
                                         border: '1px solid #000000', 
                                         aspectRatio: '16 / 9',
                                         width: '100%',
                                         maxWidth: '800px',
                                     }}>
                                    <img 
                                        src={img.src} 
                                        alt={img.alt} 
                                        className="w-100 h-100 object-fit-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600?text=Add+Image+Here'; }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3 Role Tiles Section */}
                    <div className="home-role-tiles-grid home-role-tiles-grid--hero">
                        {roleTiles.map(({ title, blurb, loginTo, registerTo }) => (
                            <div key={title} className="home-role-tile">
                                <div className="home-role-tile-inner">
                                    <h3 className="fw-bold text-body mb-2 fs-4 home-tile-title">{title}</h3>
                                    <p className="text-muted small mb-3 px-1 home-tile-blurb">{blurb}</p>
                                    <div className="d-flex flex-column gap-2 px-2">
                                        <Link
                                            to={loginTo}
                                            className="btn fw-semibold rounded-3 py-2 text-body border"
                                            style={{
                                                backgroundColor: 'var(--form-input-bg, #fff)',
                                                borderColor: 'var(--border-color)',
                                            }}
                                        >
                                            Login as {title.toLowerCase()}
                                        </Link>
                                        <Link
                                            to={registerTo}
                                            className="btn btn-sm fw-semibold rounded-3 py-2 text-white border-0 home-tile-btn-primary"
                                            style={{
                                                background: '#14532D',
                                                boxShadow: '0 4px 14px rgba(20, 83, 45, 0.35)',
                                            }}
                                        >
                                            Register as {title.toLowerCase()}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="position-relative py-5 px-4"
                style={{
                    background: 'var(--gradient-bg)',
                    minHeight: 'min(50vh, calc(100vh - var(--public-navbar-height, 88px)))',
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-50 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 50% at 50% -20%, var(--radial-1), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, var(--radial-2), transparent)',
                    }}
                />
                <div className="container position-relative" style={{ maxWidth: '1100px' }}>
                    <div className="row align-items-center gy-5">
                        <div className="col-lg-7">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                            >
                                <p className="text-uppercase small fw-semibold mb-2 home-hero-eyebrow">
                                    Cleaner streets, together
                                </p>
                                <h1 className="display-5 fw-bold mb-3 lh-sm" style={{ color: '#14532D' }}>
                                    Report civic issues.{' '}
                                    <span>
                                        See them resolved.
                                    </span>
                                </h1>
                                <p className="lead text-muted mb-4" style={{ maxWidth: '32rem' }}>
                                    CleanStreet connects residents with local teams to track garbage, hazards, and
                                    maintenance—so your neighborhood stays safe and clean.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link
                                        to="/signup/citizen"
                                        className="btn btn-lg px-4 py-3 rounded-3 fw-semibold text-white border-0"
                                        style={{
                                            background: '#14532D',
                                            boxShadow: '0 8px 24px rgba(20, 83, 45, 0.35)',
                                        }}
                                    >
                                        Get started
                                    </Link>
                                    <Link to="/about" className="btn btn-lg btn-outline-secondary px-4 py-3 rounded-3 fw-semibold">
                                        Learn more
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-4 p-4 p-lg-5 shadow-lg"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid #000000',
                                }}
                            >
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            background: '#14532D',
                                        }}
                                    >
                                        <BarChart3 size={28} />
                                    </div>
                                    <div>
                                        <p className="fw-semibold text-body mb-0">Live overview</p>
                                        <p className="small text-muted mb-0">Complaints and resolution flow</p>
                                    </div>
                                </div>
                                <div className="row g-2 text-center small">
                                    <div className="col-4">
                                        <div className="rounded-3 py-3" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="fw-bold text-body fs-5">24/7</div>
                                            <div className="text-muted">Reporting</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="rounded-3 py-3" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="fw-bold text-body fs-5">Map</div>
                                            <div className="text-muted">Pin issues</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="rounded-3 py-3" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="fw-bold text-body fs-5">Track</div>
                                            <div className="text-muted">Status</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 px-4 bg-body">
                <div className="container" style={{ maxWidth: '1100px' }}>
                        <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold mb-3" style={{ color: '#14532D' }}>Why CleanStreet</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '36rem' }}>
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
                                    className="h-100 rounded-4 p-4"
                                    style={{
                                        backgroundColor: 'var(--card-bg)',
                                        border: '1px solid #000000',
                                    }}
                                >
                                    <div
                                        className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3 text-white"
                                        style={{
                                            width: 48,
                                            height: 48,
                                            background: '#14532D',
                                        }}
                                    >
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="h5 fw-bold text-body">{title}</h3>
                                    <p className="small text-muted mb-0">{text}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;

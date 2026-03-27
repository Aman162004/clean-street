import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const PublicLayout = ({ children }) => {
    return (
        <>
            <PublicNavbar />
            <main className="min-vh-100 app-aurora-bg" style={{ paddingTop: 'var(--public-navbar-height, 88px)' }}>
                {children}
            </main>
            <footer
                className="border-top py-4 mt-auto"
                style={{ backgroundColor: 'var(--navbar-bg)' }}
            >
                <div className="container px-4">
                    <div className="row g-3 align-items-center justify-content-between">
                        <div className="col-md-6 text-center text-md-start">
                            <span className="fw-semibold text-body">CleanStreet</span>
                            <span className="text-muted ms-2 small">Civic cleanliness reporting for your community.</span>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <Link to="/about" className="text-muted small text-decoration-none me-3">
                                About
                            </Link>
                            <Link to="/help" className="text-muted small text-decoration-none me-3">
                                Help
                            </Link>
                            <Link to="/contact" className="text-muted small text-decoration-none">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <p className="text-center text-muted small mb-0 mt-3">
                        © {new Date().getFullYear()} CleanStreet. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default PublicLayout;

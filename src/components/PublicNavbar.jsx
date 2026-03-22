import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const getDashboardRoute = () => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') return '/admin';
    if (role === 'volunteer') return '/volunteer';
    return '/dashboard';
};

const navGradientBtnStyle = {
    background: '#14532D',
    color: '#FFFFFF',
    boxShadow: '0 4px 14px rgba(20, 83, 45, 0.35)',
    minHeight: '44px',
};

const PublicNavbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true' && !!localStorage.getItem('token');
    });

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true' && !!localStorage.getItem('token'));
    }, [location.pathname]);

    const navLinkClass = ({ isActive }) =>
        `btn py-2 px-3 px-lg-4 rounded-3 fw-semibold text-decoration-none ${
            isActive ? 'text-white border-0 shadow-sm' : 'text-dark'
        }`;

    const navLinkStyle = ({ isActive }) => ({
        backgroundColor: isActive ? '#14532D' : 'transparent',
        color: isActive ? '#FFFFFF' : '#000000',
    });

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top border-bottom shadow-sm align-items-center public-navbar"
            style={{
                minHeight: 'var(--public-navbar-height, 88px)',
                zIndex: 1000,
                backgroundColor: 'var(--navbar-bg)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <div className="container-fluid px-3 px-lg-4 py-1">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none py-1">
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#22C55E" />
                                    <stop offset="100%" stopColor="#14B8A6" />
                                </linearGradient>
                            </defs>
                            <rect width="32" height="32" rx="6" fill="url(#navLogoGradient)" />
                            <path
                                d="M6 18V26H10V18H6ZM11 15V26H15V15H11ZM16 17V26H20V17H16ZM21 19V26H25V19H21Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <span className="fw-bold fs-4" style={{ color: '#000000' }}>CleanStreet</span>
                </Link>

                <button
                    className="navbar-toggler py-2 px-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#publicNavbar"
                    aria-controls="publicNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="publicNavbar">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <NavLink to="/" end className={navLinkClass} style={navLinkStyle}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <NavLink to="/about" className={navLinkClass} style={navLinkStyle}>
                                About us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/help" className={navLinkClass} style={navLinkStyle}>
                                Help
                            </NavLink>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <NavLink to="/contact" className={navLinkClass} style={navLinkStyle}>
                                Contact
                            </NavLink>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link to={getDashboardRoute()} className="nav-link fw-medium px-3 py-2" style={{ color: '#000000' }}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-2 gap-lg-3 flex-wrap justify-content-lg-end mt-2 mt-lg-0">
                        <div className="dropdown">
                            <button
                                type="button"
                                className="btn dropdown-toggle fw-semibold py-2 px-3 px-lg-4 rounded-3 border-0 text-white shadow-sm"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={navGradientBtnStyle}
                            >
                                Login
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border">
                                <li>
                                    <Link className="dropdown-item" to="/login/citizen">
                                        Login as citizen
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/login/volunteer">
                                        Login as volunteer
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/login/admin">
                                        Login as admin
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown">
                            <button
                                type="button"
                                className="btn dropdown-toggle fw-semibold py-2 px-3 px-lg-4 rounded-3 border-0 text-white shadow-sm"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={navGradientBtnStyle}
                            >
                                Register
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border">
                                <li>
                                    <Link className="dropdown-item" to="/signup/citizen">
                                        Register as citizen
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/signup/volunteer">
                                        Register as volunteer
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/signup/admin">
                                        Register as admin
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="btn rounded-3 py-2 px-3 d-flex align-items-center justify-content-center"
                            aria-label="Toggle theme"
                            style={{ 
                                minHeight: '44px', 
                                minWidth: '44px',
                                backgroundColor: '#14532D',
                                color: '#FFFFFF'
                            }}
                        >
                            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;

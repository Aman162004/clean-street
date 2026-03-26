import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, FileText, User, Settings, LogOut, AlertTriangle, Shield, ClipboardList, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NewSidebar = ({ isOpen, toggleSidebar, onLogout, user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    // Define menu items based on user role
    const getMenuItems = () => {
        const role = user?.role || localStorage.getItem('userRole');

        if (role === 'admin') {
            return [
                { label: 'Dashboard', path: '/dashboard', icon: Home },
                { label: 'Admin Panel', path: '/admin', icon: Shield },
                { label: 'Report Issue', path: '/report-issue', icon: AlertTriangle },
                { label: 'Complaints', path: '/complaints', icon: FileText },
                { label: 'Map View', path: '/map', icon: MapPin },
                { label: 'Profile', path: '/profile', icon: User },
                { label: 'Settings', path: '/settings', icon: Settings },
            ];
        } else if (role === 'volunteer') {
            return [
                { label: 'My Assignments', path: '/volunteer', icon: ClipboardList },
                { label: 'Map View', path: '/map', icon: MapPin },
                { label: 'Profile', path: '/profile', icon: User },
                { label: 'Settings', path: '/settings', icon: Settings },
            ];
        } else {
            // Citizen
            return [
                { label: 'Dashboard', path: '/dashboard', icon: Home },
                { label: 'Report Issue', path: '/report-issue', icon: AlertTriangle },
                { label: 'My Complaints', path: '/complaints', icon: FileText },
                { label: 'Map View', path: '/map', icon: MapPin },
                { label: 'Profile', path: '/profile', icon: User },
                { label: 'Settings', path: '/settings', icon: Settings },
            ];
        }
    };

    const menuItems = getMenuItems();

    const initials = (user?.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    return (
        <>
            {/* Sidebar */}
            <motion.aside
                className="sidebar position-fixed top-0 start-0 h-100 d-flex flex-column"
                style={{
                    zIndex: 1040,
                    width: isOpen ? '280px' : '80px',
                    borderRight: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'width 0.3s ease'
                }}
                initial={false}
            >
                {/* Logo Section */}
                <div
                    className="d-flex align-items-center px-4 py-3"
                    style={{
                        height: '70px',
                        backgroundColor: 'var(--bg-surface)',
                        borderBottom: '1px solid var(--border-primary)'
                    }}
                >
                    <div className="d-flex align-items-center">
                        {/* Logo Badge - Solid Primary Color */}
                        <div className="rounded-2 d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--primary-main)',
                                color: 'white'
                            }}>
                            <span className="fw-bold fs-5">CS</span>
                        </div>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h5 className="mb-0 fw-bold" style={{ color: 'var(--text-primary)' }}>CleanStreet</h5>
                                <small style={{ color: 'var(--text-muted)' }}>Smart City Solution</small>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
                    <div className="nav flex-column">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => navigate(item.path)}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn d-flex align-items-center w-100 text-start border-0 rounded-lg mb-2 p-3 position-relative"
                                    style={{
                                        backgroundColor: isActive ? 'var(--primary-main)' : 'transparent',
                                        color: isActive ? 'white' : 'var(--text-primary)',
                                        boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                                        transition: 'var(--transition-fast)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <Icon
                                        size={20}
                                        className={`${isOpen ? 'me-3' : ''} flex-shrink-0`}
                                        style={{ minWidth: '20px' }}
                                    />
                                    {isOpen && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="fw-medium"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                    {isActive && (
                                        <motion.div
                                            className="position-absolute top-50 translate-middle-y rounded-pill"
                                            style={{
                                                right: '8px',
                                                width: '4px',
                                                height: '20px',
                                                backgroundColor: 'white'
                                            }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </nav>

                {/* User Section */}
                <div className="p-3" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-primary)'
                }}>
                    {/* User Profile */}
                    <div className={`d-flex align-items-center mb-3 p-3 rounded-lg ${!isOpen ? 'justify-content-center' : ''}`}
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                        {/* Avatar - Solid Primary Color */}
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                            style={{
                                width: '44px',
                                height: '44px',
                                backgroundColor: 'var(--primary-main)',
                                fontSize: '14px'
                            }}
                        >
                            {initials}
                        </div>
                        {isOpen && (
                            <motion.div
                                className="ms-3 min-w-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p className="mb-0 fw-semibold text-truncate" style={{ color: 'var(--text-primary)' }}>{user?.name || 'User'}</p>
                                <small className="text-capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role || 'Citizen'}</small>
                            </motion.div>
                        )}
                    </div>

                    {/* Theme Toggle Button */}
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`btn w-100 d-flex align-items-center border rounded-lg p-3 mb-2 ${!isOpen ? 'justify-content-center' : ''}`}
                        style={{
                            borderColor: 'var(--primary-main)',
                            backgroundColor: 'transparent',
                            color: 'var(--primary-main)',
                            transition: 'var(--transition-fast)'
                        }}
                        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        {theme === 'light' ? <Moon size={20} className={`${isOpen ? 'me-3' : ''}`} /> : <Sun size={20} className={`${isOpen ? 'me-3' : ''}`} />}
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fw-medium"
                            >
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </motion.span>
                        )}
                    </motion.button>

                    {/* Logout Button */}
                    <motion.button
                        onClick={onLogout}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`btn btn-danger w-100 d-flex align-items-center rounded-lg p-3 ${!isOpen ? 'justify-content-center' : ''}`}
                        style={{
                            backgroundColor: 'var(--status-danger)',
                            border: 'none',
                            transition: 'var(--transition-fast)'
                        }}
                    >
                        <LogOut size={20} className={`${isOpen ? 'me-3' : ''}`} />
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fw-medium"
                            >
                                Logout
                            </motion.span>
                        )}
                    </motion.button>
                </div>
            </motion.aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{
                        zIndex: 1030,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)'
                    }}
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default NewSidebar;
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

const NewHeader = ({ toggleSidebar, user, sidebarWidth = 80 }) => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard Overview';
            case '/profile':
                return 'My Profile';
            case '/complaints':
                return 'Complaints';
            case '/map':
                return 'Map View';
            case '/report-issue':
                return 'Report a Civic Issue';
            case '/settings':
                return 'Settings';
            default:
                return 'CleanStreet';
        }
    };

    const getPageDescription = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Monitor city cleanliness and track reports';
            case '/profile':
                return 'Manage your account information';
            case '/complaints':
                return 'View and manage citizen complaints';
            case '/map':
                return 'Interactive city map with real-time data';
            case '/report-issue':
                return 'Help us keep the city clean by reporting issues';
            case '/settings':
                return 'Customize your preferences';
            default:
                return 'Smart city cleanliness management';
        }
    };

    return (
        <motion.header
            className="position-fixed top-0 end-0 d-flex align-items-center justify-content-between px-4 py-3"
            style={{
                height: '70px',
                zIndex: 1020,
                left: `${sidebarWidth}px`,
                backgroundColor: 'var(--bg-surface)',
                borderBottom: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'left 0.3s ease, background-color 0.3s ease'
            }}
            initial={{ y: -70 }}
            animate={{ y: 0 }}
        >
            {/* Left Section - Menu & Title */}
            <div className="d-flex align-items-center min-w-0 flex-grow-1">
                {/* Mobile Menu Toggle */}
                <motion.button
                    onClick={toggleSidebar}
                    className="btn btn-light rounded-3 p-2 me-3 d-lg-none border-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        transition: 'var(--transition-fast)'
                    }}
                >
                    <Menu size={20} />
                </motion.button>

                {/* Page Title & Description */}
                <div className="min-w-0 flex-grow-1">
                    <motion.h1
                        className="fs-4 fw-bold mb-0"
                        style={{ color: 'var(--text-primary)' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={location.pathname}
                    >
                        {getPageTitle()}
                    </motion.h1>
                    <motion.p
                        className="mb-0 small d-none d-sm-block"
                        style={{ color: 'var(--text-muted)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {getPageDescription()}
                    </motion.p>
                </div>
            </div>

            {/* Right Section - Actions & User */}
            <div className="d-flex align-items-center gap-3 flex-shrink-0">
                {/* Search Button */}
                <motion.button
                    className="btn btn-light rounded-3 p-2 border-0 d-none d-md-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--primary-main)',
                        transition: 'var(--transition-fast)'
                    }}
                >
                    <Search size={18} />
                </motion.button>

                {/* Notifications */}
                <motion.button
                    className="btn btn-light rounded-3 p-2 border-0 position-relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--primary-main)',
                        transition: 'var(--transition-fast)'
                    }}
                >
                    <Bell size={18} />
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                        style={{
                            fontSize: '10px',
                            backgroundColor: 'var(--status-danger)',
                            color: '#fff'
                        }}
                    >
                        3
                    </span>
                </motion.button>

                {/* Divider */}
                <div
                    className="d-none d-sm-block"
                    style={{
                        width: '1px',
                        height: '30px',
                        backgroundColor: 'var(--border-primary)'
                    }}
                />

                {/* User Profile */}
                <motion.div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    style={{ cursor: 'pointer' }}
                >
                    {/* User Info (Hidden on small screens) */}
                    <div className="text-end d-none d-lg-block">
                        <p className="mb-0 fw-semibold" style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                            {user?.name || 'User'}
                        </p>
                        <p className="mb-0 text-capitalize" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {user?.role || 'Citizen'}
                        </p>
                    </div>

                    {/* Avatar - Solid Primary Color */}
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                            width: '42px',
                            height: '42px',
                            backgroundColor: 'var(--primary-main)',
                            fontSize: '14px',
                            flex: '0 0 auto'
                        }}
                    >
                        {(user?.name || 'U')[0].toUpperCase()}
                    </div>

                    {/* Dropdown Arrow */}
                    <ChevronDown size={16} className="d-none d-lg-block" style={{ color: 'var(--text-muted)' }} />
                </motion.div>
            </div>
        </motion.header>
    );
};

export default NewHeader;
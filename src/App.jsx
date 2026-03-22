import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import {
    parseRoleParam,
    LOGIN_SUBTITLE,
    SIGNUP_SUBTITLE,
} from './lib/authRouting';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Complaints from './pages/Complaints';
import MapView from './pages/MapView';
import Settings from './pages/Settings';
import ReportIssue from './pages/ReportIssue';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login/citizen" replace />;
    }
    return children;
};

function RoleLoginRoute({ isAuthenticated, onLogin, getDashboardRoute }) {
    const { role } = useParams();
    const parsed = parseRoleParam(role);
    if (!parsed) {
        return <Navigate to="/login/citizen" replace />;
    }
    if (isAuthenticated) {
        return <Navigate to={getDashboardRoute()} replace />;
    }
    return (
        <AuthLayout subtitle={LOGIN_SUBTITLE[parsed]}>
            <Login onLogin={onLogin} expectedRole={parsed} />
        </AuthLayout>
    );
}

function RoleSignupRoute({ isAuthenticated, onLogin, getDashboardRoute }) {
    const { role } = useParams();
    const parsed = parseRoleParam(role);
    if (!parsed) {
        return <Navigate to="/signup/citizen" replace />;
    }
    if (isAuthenticated) {
        return <Navigate to={getDashboardRoute()} replace />;
    }
    return (
        <AuthLayout subtitle={SIGNUP_SUBTITLE[parsed]}>
            <Signup onLogin={onLogin} expectedRole={parsed} />
        </AuthLayout>
    );
}

function App() {
    // Initialize auth state from localStorage to persist login across refreshes
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const auth = localStorage.getItem('isAuthenticated') === 'true';
        const hasToken = !!localStorage.getItem('token');
        return auth && hasToken;
    });

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
    };

    const getDashboardRoute = () => {
        const role = localStorage.getItem('userRole');
        if (role === 'admin') return '/admin';
        if (role === 'volunteer') return '/volunteer';
        return '/dashboard';
    };

    return (
        <Router>
            <Routes>
                {/* Public auth — role-specific URLs */}
                <Route path="/login" element={<Navigate to="/login/citizen" replace />} />
                <Route path="/signup" element={<Navigate to="/signup/citizen" replace />} />
                <Route
                    path="/login/:role"
                    element={
                        <RoleLoginRoute
                            isAuthenticated={isAuthenticated}
                            onLogin={handleLogin}
                            getDashboardRoute={getDashboardRoute}
                        />
                    }
                />
                <Route
                    path="/signup/:role"
                    element={
                        <RoleSignupRoute
                            isAuthenticated={isAuthenticated}
                            onLogin={handleLogin}
                            getDashboardRoute={getDashboardRoute}
                        />
                    }
                />

                {/* Public marketing pages */}
                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <Home />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PublicLayout>
                            <AboutUs />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/help"
                    element={
                        <PublicLayout>
                            <Help />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PublicLayout>
                            <Contact />
                        </PublicLayout>
                    }
                />

                {/* Protected Dashboard Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <DashboardLayout onLogout={handleLogout}>
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/volunteer" element={<VolunteerDashboard />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/complaints" element={<Complaints />} />
                                    <Route path="/map" element={<MapView />} />
                                    <Route path="/report-issue" element={<ReportIssue />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    {/* Catch all inside dashboard to redirect based on role */}
                                    <Route path="*" element={<Navigate to={getDashboardRoute()} replace />} />
                                </Routes>
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
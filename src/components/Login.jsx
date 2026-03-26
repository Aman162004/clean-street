import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { dashboardPathForRole, roleLabel } from '../lib/authRouting';

function Login({ onLogin, expectedRole = 'citizen' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasCapital: false,
        hasSpecial: false
    })

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    useEffect(() => {
        const validation = {
            minLength: password.length >= 8,
            hasCapital: /[A-Z]/.test(password),
            hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        }
        setPasswordValidation(validation)
        setIsPasswordValid(validation.minLength && validation.hasCapital && validation.hasSpecial)
    }, [password])

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (errors.email) {
            setErrors({ ...errors, email: '' })
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (errors.password) {
            setErrors({ ...errors, password: '' })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        // Validation
        if (!email) {
            newErrors.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                newErrors.email = 'Please enter a valid email address'
            }
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (!isPasswordValid) {
            newErrors.password = 'Password must meet all requirements'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        console.log('Login attempt:', { email, password })

        const loginUser = async () => {
            try {
                const response = await api.post('/auth/login', { email, password });
                // Store token and auth state
                localStorage.setItem('token', response.token);
                localStorage.setItem('isAuthenticated', 'true');
                
                // Store user data including role
                if (response.user) {
                    localStorage.setItem('userRole', response.user.role);
                    localStorage.setItem('userData', JSON.stringify(response.user));
                }
                
                const actualRole = response.user?.role;
                if (actualRole && actualRole !== expectedRole) {
                    setErrors((prev) => ({
                        ...prev,
                        password: `This account is registered as ${roleLabel(actualRole)}. Please use the ${roleLabel(actualRole)} login page.`,
                    }));
                    return;
                }

                if (onLogin) {
                    onLogin();
                }

                navigate(dashboardPathForRole(actualRole || expectedRole));
            } catch (err) {
                console.error('Login error:', err);
                setErrors({ ...errors, password: 'Invalid email or password' });
            }
        };

        loginUser();
    }

    return (
        <div className="auth-card">
            <div className="card" style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-2" style={{ color: 'var(--text-primary)' }}>
                        Welcome to CleanStreet
                    </h2>
                    <p className="text-center mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Sign in to your account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="loginEmail" className="form-label" style={{ color: 'var(--text-primary)' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmail"
                                placeholder="you@example.com"
                                value={email}
                                onChange={handleEmailChange}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.email ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.email && (
                                <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="loginPassword" className="form-label" style={{ color: 'var(--text-primary)' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="loginPassword"
                                placeholder="••••••••"
                                value={password}
                                onChange={handlePasswordChange}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.password ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.password && (
                                <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>
                                    {errors.password}
                                </div>
                            )}
                            {passwordFocused && (
                                <div className="mt-3 p-3 rounded-lg" style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-primary)'
                                }}>
                                    <small style={{
                                        color: passwordValidation.minLength ? 'var(--status-success)' : 'var(--status-danger)',
                                        display: 'block'
                                    }}>
                                        {passwordValidation.minLength ? '✓' : '✗'} At least 8 characters
                                    </small>
                                    <small style={{
                                        color: passwordValidation.hasCapital ? 'var(--status-success)' : 'var(--status-danger)',
                                        display: 'block'
                                    }}>
                                        {passwordValidation.hasCapital ? '✓' : '✗'} At least 1 capital letter
                                    </small>
                                    <small style={{
                                        color: passwordValidation.hasSpecial ? 'var(--status-success)' : 'var(--status-danger)',
                                        display: 'block'
                                    }}>
                                        {passwordValidation.hasSpecial ? '✓' : '✗'} At least 1 special character (!@#$%^&*...)
                                    </small>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg w-100 fw-bold rounded-lg text-white border-0"
                            style={{
                                backgroundColor: 'var(--primary-main)',
                                transition: 'var(--transition-normal)',
                                padding: '0.75rem'
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
                            Sign In
                        </button>
                        <div className="text-center">
                            <small style={{ color: 'var(--text-muted)' }}>
                                Don't have an account?{' '}
                                <Link to={`/signup/${expectedRole}`} style={{ color: 'var(--primary-main)' }} className="text-decoration-none fw-semibold">
                                    Register as {roleLabel(expectedRole)}
                                </Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

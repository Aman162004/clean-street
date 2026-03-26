import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { dashboardPathForRole, roleLabel } from '../lib/authRouting';

function Signup({ onLogin, expectedRole = 'citizen' }) {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        role: expectedRole
    })
    const navigate = useNavigate();

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasCapital: false,
        hasSpecial: false
    })

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const [errors, setErrors] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: ''
    })

    useEffect(() => {
        const password = formData.password
        const validation = {
            minLength: password.length >= 8,
            hasCapital: /[A-Z]/.test(password),
            hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        }
        setPasswordValidation(validation)
        setIsPasswordValid(validation.minLength && validation.hasCapital && validation.hasSpecial)
    }, [formData.password])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { fullName, username, email, phone, password } = formData
        const newErrors = {}

        // Validation
        if (!fullName) {
            newErrors.fullName = 'Full name is required'
        }

        if (!username) {
            newErrors.username = 'Username is required'
        }

        if (!email) {
            newErrors.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                newErrors.email = 'Please enter a valid email address'
            }
        }

        if (!phone) {
            newErrors.phone = 'Phone number is required'
        } else {
            const cleanPhone = phone.replace(/\D/g, '')
            if (cleanPhone.length < 10) {
                newErrors.phone = 'Please enter a valid phone number (at least 10 digits)'
            }
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else {
            // Password validation: min 8 chars, 1 capital letter, 1 special character
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
            if (!passwordRegex.test(password)) {
                newErrors.password = 'Password must contain at least 8 characters, 1 capital letter, and 1 special character'
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        console.log('Registration attempt:', formData)

        const registerUser = async () => {
            try {
                // Map fullName to name for backend
                const { fullName, email, password, role, phone } = formData;
                const response = await api.post('/auth/register', {
                    name: fullName,
                    email,
                    password,
                    role,
                    phone
                });

                // Store token and auth state
                localStorage.setItem('token', response.token);
                localStorage.setItem('isAuthenticated', 'true');
                
                // Store user role (from form selection)
                localStorage.setItem('userRole', role);

                if (onLogin) {
                    onLogin();
                }

                navigate(dashboardPathForRole(role));
            } catch (err) {
                console.error('Registration error:', err);
                const message = err?.message || 'Registration failed. Please try again.';
                setErrors((prev) => ({ ...prev, email: message }));
            }
        };

        registerUser();
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
                        Create Your Account
                    </h2>
                    <p className="text-center mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Register to help keep your city clean
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="signupFullName" className="form-label" style={{ color: 'var(--text-primary)' }}>Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="signupFullName"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.fullName ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.fullName && <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>{errors.fullName}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signupUsername" className="form-label" style={{ color: 'var(--text-primary)' }}>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="signupUsername"
                                name="username"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.username ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.username && <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>{errors.username}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signupEmail" className="form-label" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="signupEmail"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.email ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.email && <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'var(--text-primary)' }}>Account Type</label>
                            <div
                                className="form-control border-0"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    cursor: 'default'
                                }}
                            >
                                {roleLabel(expectedRole)} — use the navbar to pick a different registration type if needed.
                            </div>
                        </div>

                        {expectedRole === 'volunteer' && (
                            <div className="mb-3">
                                <label htmlFor="signupDepartment" className="form-label" style={{ color: 'var(--text-primary)' }}>Department</label>
                                <select 
                                    className="form-select"
                                    id="signupDepartment"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <option value="Waste Management">Waste Management</option>
                                    <option value="Roads & Transportation">Roads & Transportation</option>
                                    <option value="Water & Sanitation">Water & Sanitation</option>
                                    <option value="Electrical & Lighting">Electrical & Lighting</option>
                                    <option value="Public Parks">Public Parks</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="signupPhone" className="form-label" style={{ color: 'var(--text-primary)' }}>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="signupPhone"
                                name="phone"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.phone ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.phone && <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>{errors.phone}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="signupPassword" className="form-label" style={{ color: 'var(--text-primary)' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="signupPassword"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderColor: errors.password ? 'var(--status-danger)' : 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.password && <div className="small mt-2" style={{ color: 'var(--status-danger)' }}>{errors.password}</div>}
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
                            className="btn btn-primary w-100 mb-3 fw-semibold"
                            style={{
                                backgroundColor: 'var(--primary-main)',
                                borderColor: 'var(--primary-main)',
                                color: 'white',
                                padding: '0.75rem'
                            }}
                        >
                            Create Account
                        </button>
                        <div className="text-center">
                            <small style={{ color: 'var(--text-muted)' }}>
                                Already have an account?{' '}
                                <Link to={`/login/${expectedRole}`} style={{ color: 'var(--primary-main)' }} className="text-decoration-none fw-semibold">
                                    Sign In as {roleLabel(expectedRole)}
                                </Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

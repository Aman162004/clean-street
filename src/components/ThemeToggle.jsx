import React from 'react'

function ThemeToggle({ currentTheme, onThemeChange }) {
    // Light mode disabled; always dark
    const isLightMode = false

    const toggleTheme = () => {
        onThemeChange('dark')
    }

    return (
        <button
            className="btn btn-outline-secondary border-0 rounded-circle p-2"
            onClick={toggleTheme}
            title="Dark mode enforced"
            aria-label="Dark mode enforced"
            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {/* Fixed moon icon to indicate dark mode only */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}

export default ThemeToggle

/**
 * Centralized Color System for Clean Street App
 * Bold & Energetic design with solid colors for light/dark modes
 */

export const colorSystem = {
  // Primary Colors
  primary: {
    main: '#0d9488',      // Teal - main brand color
    light: '#14b8a6',     // Lighter teal
    dark: '#0f766e',      // Darker teal
    contrast: '#ffffff',  // Text on primary
  },

  // Secondary Colors (Success/Progress)
  secondary: {
    main: '#059669',      // Emerald - positive actions
    light: '#10b981',
    dark: '#047857',
    contrast: '#ffffff',
  },

  // Accent Colors
  accent: {
    main: '#4f46e5',      // Indigo - accents & highlights
    light: '#6366f1',
    dark: '#4338ca',
    contrast: '#ffffff',
  },

  // Status Colors
  status: {
    danger: '#be123c',    // Rose - errors & urgent
    warning: '#b45309',   // Amber - warnings & pending
    success: '#059669',   // Emerald - completed
    info: '#0d9488',      // Teal - information
  },

  // Neutral Colors - Light Mode
  light: {
    background: '#ffffff',           // Main background
    surface: '#f8fafc',              // Card/elevated surfaces
    border: '#e2e8f0',               // Light borders
    hover: '#f1f5f9',                // Hover states
    placeholder: '#cbd5e1',          // Placeholder text
    text: {
      primary: '#0f172a',            // Main text
      secondary: '#475569',          // Secondary text
      muted: '#64748b',              // Muted text
      light: '#94a3b8',              // Very light text
    },
  },

  // Neutral Colors - Dark Mode
  dark: {
    background: '#0f172a',           // Deep slate background
    surface: '#1e293b',              // Card/elevated surfaces
    border: '#334155',               // Dark borders
    hover: '#1e293b',                // Hover states (slightly lighter)
    placeholder: '#64748b',          // Placeholder text
    text: {
      primary: '#f1f5f9',            // Main text
      secondary: '#cbd5e1',          // Secondary text
      muted: '#94a3b8',              // Muted text
      light: '#64748b',              // Very light text
    },
  },

  // Semantic Colors for Cards/Stats
  cardAccents: {
    teal: '#0d9488',
    emerald: '#059669',
    indigo: '#4f46e5',
    rose: '#be123c',
    amber: '#b45309',
    cyan: '#06b6d4',
  },

  // Shadows
  shadow: {
    sm: 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Transitions
  transition: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },

  // Opacity
  opacity: {
    disabled: 0.5,
    hover: 0.9,
    focus: 0.95,
  },

  // Spacing Scale (in rem)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
};

/**
 * Get CSS custom property value based on theme
 * Usage: getCSSVariable('primary', 'main') => '--primary-main'
 */
export const getCSSVariable = (category, key) => {
  return `var(--${category}-${key})`;
};

export default colorSystem;

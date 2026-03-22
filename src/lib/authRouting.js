/** @typedef {'citizen' | 'volunteer' | 'admin'} UserRole */

export const VALID_ROLES = ['citizen', 'volunteer', 'admin'];

/**
 * @param {string | undefined} role
 * @returns {UserRole | null}
 */
export function parseRoleParam(role) {
    const r = String(role || '').toLowerCase();
    return VALID_ROLES.includes(r) ? /** @type {UserRole} */ (r) : null;
}

/**
 * @param {string | undefined} role
 * @returns {string}
 */
export function dashboardPathForRole(role) {
    if (role === 'admin') return '/admin';
    if (role === 'volunteer') return '/volunteer';
    return '/dashboard';
}

export const LOGIN_SUBTITLE = {
    citizen: 'Welcome Back, Citizen!',
    volunteer: 'Welcome Back, Volunteer!',
    admin: 'Welcome Back, Admin!',
};

export const SIGNUP_SUBTITLE = {
    citizen: 'Join as a Citizen',
    volunteer: 'Join as a Volunteer',
    admin: 'Join as an Admin',
};

export function roleLabel(role) {
    if (role === 'admin') return 'Admin';
    if (role === 'volunteer') return 'Volunteer';
    return 'Citizen';
}

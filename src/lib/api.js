const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getHeaders = (isFormData = false) => {
    const token = localStorage.getItem('token');
    console.log('API Request Header Check - Token present:', !!token);
    return {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: getHeaders()
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login/citizen'; // Force redirect on session expiry
            return;
        }
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API request failed with status ${response.status}`);
        }
        return response.json();
    },

    post: async (endpoint, data) => {
        const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(isFormData),
            body: isFormData ? data : JSON.stringify(data)
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login/citizen';
            return;
        }
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API request failed with status ${response.status}`);
        }
        return response.json();
    },

    put: async (endpoint, data) => {
        const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(isFormData),
            body: isFormData ? data : JSON.stringify(data)
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login/citizen';
            return;
        }
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API request failed with status ${response.status}`);
        }
        return response.json();
    }
};

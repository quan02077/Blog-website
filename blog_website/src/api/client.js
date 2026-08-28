export const BASE_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return data.token;
        }
    } catch (error) {
        console.error("Lỗi khi gia hạn token ngầm:", error);
    }
    return null;
};

export const request = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
    };
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const responseOptions = {
        ...options,
        headers,
        credentials: 'include'
    };

    let response = await fetch(url, responseOptions);

    const isAuthEndpoint = endpoint.includes('/api/auth/login') ||
        endpoint.includes('/api/auth/register') ||
        endpoint.includes('/api/auth/refresh');

    if (response.status === 401 && !isAuthEndpoint) {
        console.log("Access Token hết hạn, đang tự động gia hạn ngầm...");

        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url, responseOptions);
        } else {
            console.warn("Phiên làm việc đã hết hạn. Đang đăng xuất...");
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            localStorage.setItem('isSignIn', 'false');
            window.location.reload();
        }
    }

    return response;
};

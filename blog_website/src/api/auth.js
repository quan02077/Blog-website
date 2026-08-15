import { request } from './client';

export const loginApi = async (email, password) => {
    const response = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Email hoặc mật khẩu không đúng');
    }

    return response.json();
};

export const registerApi = async (username, email, password) => {
    const response = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Đăng ký thất bại');
    }

    return response.json();
};

export const getMeApi = async (token) => {
    const response = await request('/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        throw new Error('Không thể lấy thông tin tài khoản');
    }

    return response.json();
};

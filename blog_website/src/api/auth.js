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

export const forgotPasswordApi = async (email) => {
    const response = await request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Yêu cầu thất bại');
    }

    return response.json();
};

export const resetPasswordApi = async (email, token, newPassword) => {
    const response = await request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, token, newPassword }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Đặt lại mật khẩu thất bại');
    }

    return response.json();
};


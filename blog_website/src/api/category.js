import { request } from './client';

export const getAllCategories = async () => {
    const response = await request('/post/categories', {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Không thể lấy danh sách chuyên mục');
    }

    return response.json();
};

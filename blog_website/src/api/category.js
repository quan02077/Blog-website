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

export const createCategory = async (categoryName) => {
    const response = await request('/post/categories', {
        method: 'POST',
        body: JSON.stringify({ name: categoryName })
    });

    if (!response.ok) {
        throw new Error('Không thể tạo chuyên mục');
    }

    return response.json();
};

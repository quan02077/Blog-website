import { request } from './client';

export const getAllPost = async () => {
    const response = await request('/post', {
        method: 'GET'
    });
    return response.json();
}

export const getPostByID = async (id) => {
    const response = await request(`/post/${id}`, {
        method: 'GET'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Không tìm thấy bài viết!")
    }
    return response.json();
}

export const writePost = async (postData) => {
    const response = await request('/post', {
        method: 'POST',
        body: postData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Tạo bài viết thất bại!');
    }
    return response.json();
}

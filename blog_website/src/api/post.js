import { request } from './client';

export const getAllPost = async (search = '', year = '') => {
    let url = '/post';
    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (year) params.push(`year=${year}`);
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }
    const response = await request(url, {
        method: 'GET'
    });
    return response.json();
}

export const getDraftPost = async (search = '', category = 'all', sortBy = 'latest') => {
    let url = '/post/my-drafts';
    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (category && category !== 'all') params.push(`category=${encodeURIComponent(category)}`);
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }
    const response = await request(url, {
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

export const updatePost = async (id, postData) => {
    const response = await request(`/post/${id}`, {
        method: 'PUT',
        body: postData
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Cập nhật bài viết thất bại!');
    }
    return response.json();
}

export const deleteDraft_Post = async (id) => {
    const response = await request(`/post/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Xóa bản nháp thất bại!');
    }
    return response.json();
}

import { request } from './client';

export const editProfile = async (profileData) => {
    const reponse = await request('/editprofile', {
        method: 'PUT',
        body: profileData
    })
    if (!reponse.ok) {
        const error = await reponse.json();
        throw new Error(error.message || 'Cập nhật thông tin cá nhân thất bại')
    }
    return reponse.json()
}
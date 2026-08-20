const CLOUD_NAME = "jbrqslme";
const UPLOAD_PRESET = "my_blog_preset";

export const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Tải ảnh lên Cloudinary thất bại');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
        throw error;
    }
};

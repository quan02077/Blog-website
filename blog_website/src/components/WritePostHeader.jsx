import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFloppyDisk, faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showSuccessAlert, showConfirmAlert, showErrorAlert } from '../utils/alert'
import { writePost, updatePost } from '../api/post'


function WritePostHeader({ postData, onPreview, isEdit = false, image }) {
    const [, dispatch] = useContext(Blog_context)
    const navigate = useNavigate()
    const [saveLoading, setSaveLoading] = useState(false)
    const [publishLoading, setPublishLoading] = useState(false)

    const handleSaveDraft = async () => {
        const message = isEdit ? 'Bạn có chắc chắn muốn cập nhật bản nháp này?' : 'Bạn có chắc chắn muốn lưu nháp bài viết này?'
        const result = await showConfirmAlert('Thông báo', message)
        if (result.isConfirmed) {
            setSaveLoading(true);
            try {
                const formData = new FormData();
                formData.append("title", postData.title);
                formData.append("readTime", postData.readTime);
                if (postData.content) formData.append("content", postData.content);
                if (postData.summary) formData.append("summary", postData.summary);
                if (postData.categoryId) formData.append("categoryId", postData.categoryId);
                if (postData.tag) formData.append("tags", postData.tag);
                if (image instanceof File) formData.append("coverImage", image);
                if (postData.category) formData.append("category", postData.category);
                formData.append("isDraft", "true");

                let data;
                if (isEdit) {
                    data = await updatePost(postData.id, formData);
                    dispatch(action.updateDraftsAction(data));
                    await showSuccessAlert('Thông báo', 'Cập nhật bản nháp thành công');
                } else {
                    data = await writePost(formData);
                    dispatch(action.saveDraftsAction(data));
                    await showSuccessAlert('Thông báo', 'Bài viết đã được lưu vào bản nháp thành công');
                }
                dispatch(action.isDirtyAction(false));
                navigate('/drafts');
            } catch (error) {
                showErrorAlert('Lỗi', error.message);
            } finally {
                setSaveLoading(false);
            }
        }
    }

    const handlePublishPost = async () => {
        if (!postData.title.trim() || !postData.content.trim()) {
            showErrorAlert('Lỗi', 'Vui lòng nhập tiêu đề và nội dung bài viết!');
            return;
        }

        const result = await showConfirmAlert(
            'Thông báo',
            'Bạn có chắc chắn muốn đăng bài viết này?'
        );

        if (!result.isConfirmed) return;

        setPublishLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("readTime", postData.readTime);
            if (postData.content) formData.append("content", postData.content);
            if (postData.summary) formData.append("summary", postData.summary);
            if (postData.categoryId) formData.append("categoryId", postData.categoryId);
            if (postData.tag) formData.append("tags", postData.tag);
            if (image instanceof File) formData.append("coverImage", image);
            if (postData.category) formData.append("category", postData.category);
            formData.append("isDraft", "false");

            let data;
            if (isEdit) {
                data = await updatePost(postData.id, formData);
                dispatch(action.publishPostAction(data));
                dispatch(action.deleteDraftsAction(postData.id));
            } else {
                data = await writePost(formData);
                dispatch(action.publishPostAction(data));
            }
            await showSuccessAlert('Thông báo', 'Bài viết đã được đăng thành công');
            dispatch(action.isDirtyAction(false));
            navigate('/');
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        } finally {
            setPublishLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">
                        {isEdit ? 'Chỉnh sửa bản nháp' : 'Viết bài mới'}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEdit ? 'Cập nhật thông tin bản nháp của bạn' : 'Chia sẻ kiến thức của bạn với cộng đồng'}
                    </p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
                <button
                    type="button"
                    onClick={onPreview}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon icon={faEye} />
                    Xem trước
                </button>
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={saveLoading || publishLoading}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    {saveLoading ? 'Đang lưu...' : (isEdit ? 'Cập nhật nháp' : 'Lưu nháp')}
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                    onClick={handlePublishPost}
                    disabled={saveLoading || publishLoading}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {publishLoading ? 'Đang đăng...' : 'Đăng bài'}
                </button>
            </div>
        </div>
    )
}

export default WritePostHeader

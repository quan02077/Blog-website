import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEye } from '@fortawesome/free-solid-svg-icons'
import PostCard from './PostCard'
import Blog_context from '../context/Blog_Context'

function PreviewModal({ isOpen, onClose, postData }) {
    const [state] = useContext(Blog_context)
    const { currentUser } = state

    if (!isOpen) return null

    // Tạo object bài viết mẫu cho PostCard
    const previewPost = {
        id: postData?.id || 'preview',
        author: currentUser?.username || 'Bạn',
        avatar: currentUser?.avatar,
        date: 'Vừa xong',
        category: postData?.category || 'Chưa chọn chuyên mục',
        title: postData?.title || 'Tiêu đề bài viết sẽ hiển thị ở đây',
        description: postData?.summary || 'Tóm tắt ngắn về bài viết của bạn sẽ hiển thị ở đây...',
        image: postData?.image || 'https://picsum.photos/seed/blog-preview/800/400',
        likes: 0,
        comments: 0,
        readTime: `${postData?.readTime || 1} phút đọc`
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-6 animate-in slide-in-from-top-2 fade-in duration-200 flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEye} className="text-blue-500 text-xl" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Xem trước bài viết (Preview)</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                </div>

                {/* --- NỘI DUNG XEM TRƯỚC (POST CARD) --- */}
                <div className="flex-1 overflow-y-auto my-4 pr-1">
                    <PostCard post={previewPost} />
                </div>

                {/* --- FOOTER --- */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng xem trước
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal

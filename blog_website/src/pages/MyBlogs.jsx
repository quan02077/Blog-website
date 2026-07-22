import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

const sampleMyPosts = [
    {
        id: 101,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "14 Tháng 7, 2026",
        category: "React",
        title: "Hướng dẫn React Router v6 cho người mới bắt đầu",
        description: "Tìm hiểu cách sử dụng React Router v6 để xây dựng ứng dụng Single Page Application với hệ thống điều hướng mạnh mẽ và linh hoạt.",
        image: "https://picsum.photos/seed/react-router/800/400",
        likes: 42,
        comments: 12,
        readTime: "5 phút đọc",
    },
    {
        id: 102,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "12 Tháng 7, 2026",
        category: "CSS",
        title: "Tailwind CSS v4 — Những tính năng mới đáng chú ý",
        description: "Khám phá những thay đổi lớn trong Tailwind CSS v4 bao gồm @theme, CSS-first configuration và hiệu suất build nhanh hơn gấp 10 lần.",
        image: "https://picsum.photos/seed/tailwind-v4/800/400",
        likes: 85,
        comments: 23,
        readTime: "8 phút đọc",
    }
]

function MyBlogs() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnMyPosts } = state

    if (!btnMyPosts) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleMyPostsAction(false))}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-6 animate-in slide-in-from-top-2 fade-in duration-200 flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faNewspaper} className="text-blue-500 text-xl" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bài viết của tôi</h3>
                        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {sampleMyPosts.length} bài
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(action.toggleMyPostsAction(false))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                </div>

                {/* --- DANH SÁCH BÀI VIẾT --- */}
                <div className="flex-1 overflow-y-auto my-4 space-y-6 pr-1">
                    {sampleMyPosts.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Bạn chưa viết bài nào.</p>
                    ) : (
                        sampleMyPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                        onClick={() => dispatch(action.toggleMyPostsAction(false))}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyBlogs
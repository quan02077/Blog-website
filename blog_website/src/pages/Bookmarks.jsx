import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBookmark } from '@fortawesome/free-solid-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

const sampleBookmarkedPosts = [
    {
        id: 201,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "10 Tháng 7, 2026",
        category: "JavaScript",
        title: "10 mẹo JavaScript giúp code sạch hơn",
        description: "Tổng hợp 10 kỹ thuật và mẹo viết JavaScript hiện đại giúp code của bạn ngắn gọn, dễ đọc và hiệu quả hơn.",
        image: "https://picsum.photos/seed/js-tips/800/400",
        likes: 128,
        comments: 34,
        readTime: "6 phút đọc",
    }
]

function Bookmarks() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnBookmarks } = state

    if (!btnBookmarks) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleBookmarksAction(false))}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-6 animate-in slide-in-from-top-2 fade-in duration-200 flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBookmark} className="text-yellow-500 text-xl" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bài viết đã lưu (Bookmarks)</h3>
                        <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {sampleBookmarkedPosts.length} đã lưu
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(action.toggleBookmarksAction(false))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                </div>

                {/* --- DANH SÁCH BÀI VIẾT ĐÃ LƯU --- */}
                <div className="flex-1 overflow-y-auto my-4 space-y-6 pr-1">
                    {sampleBookmarkedPosts.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Chưa có bài viết nào được lưu.</p>
                    ) : (
                        sampleBookmarkedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                        onClick={() => dispatch(action.toggleBookmarksAction(false))}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Bookmarks
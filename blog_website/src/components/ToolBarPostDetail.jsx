import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faHeart,
    faBookmark,
    faShareNodes,
    faClock
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
function ToolBarPostDetail({ isLiked, handleLike, isBookmarked, post, handleBookmark, handleShare }) {
    const handleBack = () => {
        window.history.back()
    }
    return (
        <div className="flex items-center justify-between bg-white dark:bg-dark-surface p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-4 z-20 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
            <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                Quay lại
            </button>

            <div className="flex items-center gap-3">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.categoryName || post.category}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
                    <FontAwesomeIcon icon={faClock} />
                    {post.readTime ? (typeof post.readTime === 'string' && post.readTime.includes('phút') ? post.readTime : `${post.readTime} phút đọc`) : '1 phút đọc'}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${isLiked
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-500'
                        }`}
                >
                    <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} className={isLiked ? 'text-red-500' : ''} />
                    <span>{Number(post.likesCount) || 0}</span>
                </button>

                <button
                    type="button"
                    onClick={handleBookmark}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${isBookmarked
                        ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-yellow-500'
                        }`}
                >
                    <FontAwesomeIcon icon={isBookmarked ? faBookmark : faBookmarkRegular} />
                </button>

                <button
                    type="button"
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 transition-all cursor-pointer"
                    onClick={handleShare}
                    title="Chia sẻ"
                >
                    <FontAwesomeIcon icon={faShareNodes} />
                </button>
            </div>
        </div>
    )
}

export default ToolBarPostDetail
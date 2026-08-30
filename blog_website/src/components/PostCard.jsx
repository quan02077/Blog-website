import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { showSuccessAlert, showErrorAlert } from '../utils/alert'
import * as action from '../context/Actions'
import Blog_context from '../context/Blog_Context'
import { toggleBookmarkPost } from '../api/post'

function PostCard({ post }) {
    const [state, dispatch] = useContext(Blog_context)
    const navigate = useNavigate()

    const displayAuthor = post.authorName || 'Tác giả';
    const displayAvatar = post.authorAvatar || `https://ui-avatars.com/api/?name=${displayAuthor}`;

    const tagsList = Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === 'string' && post.tags.trim() !== ''
            ? post.tags.split(',').map(t => t.trim()).filter(Boolean)
            : typeof post.tag === 'string' && post.tag.trim() !== ''
                ? post.tag.split(',').map(t => t.trim()).filter(Boolean)
                : []

    const isBookmarked = state.bookmarks?.some(b => String(b.id) === String(post.id))

    const handleGoDetail = () => {
        if (post?.id) {
            navigate(`/post/${post.id}`)
        }
    }

    const handleBookmark = async () => {
        try {
            const result = await toggleBookmarkPost(post.id);
            dispatch(action.bookmarksAction(post));
            showSuccessAlert('Thông báo', result.message);
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        }
    }

    return (
        <article className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative overflow-hidden cursor-pointer" onClick={handleGoDetail}>
                <img
                    src={post.coverImage || post.image || 'https://picsum.photos/seed/post/400/200'}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.categoryName || post.category}
                </span>
            </div>

            {/* Post Body */}
            <div className="p-5">
                {/* Author & Date */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={displayAvatar}
                        alt={displayAuthor}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{displayAuthor}</span>
                        <span className="text-xs text-gray-400">
                            {post.date || (post.createdAt ? new Date(post.createdAt.endsWith('Z') || post.createdAt.includes('+') ? post.createdAt : post.createdAt + 'Z').toLocaleDateString('vi-VN') : 'Mới đây')} · {post.readTime ? (typeof post.readTime === 'string' && post.readTime.includes('phút') ? post.readTime : `${post.readTime} phút đọc`) : '1 phút đọc'}
                        </span>
                    </div>
                </div>

                {/* Title & Description */}
                <h3
                    onClick={handleGoDetail}
                    className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                >
                    {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 cursor-pointer" onClick={handleGoDetail}>
                    {post.description || post.summary}
                </p>

                {/* Tags List */}
                {tagsList.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {tagsList.map((tag, idx) => (
                            <span
                                key={`tag-${tag}-${idx}`}
                                className="text-[10px] font-medium text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-0.5 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-sm">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors text-sm">
                            <FontAwesomeIcon icon={faComment} />
                            <span>{post.comments}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBookmark}
                            className={`transition-colors ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                            title={isBookmarked ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                        >
                            <FontAwesomeIcon icon={isBookmarked ? faBookmarkSolid : faBookmark} />
                        </button>
                        <button className="text-gray-400 hover:text-green-500 transition-colors">
                            <FontAwesomeIcon icon={faShareFromSquare} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default PostCard

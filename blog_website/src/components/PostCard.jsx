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

    const displayAuthor = post.authorName || 'Tác giả'
    const displayAvatar = post.authorAvatar || `https://ui-avatars.com/api/?name=${displayAuthor}`

    const tagsList = Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === 'string' && post.tags.trim() !== ''
            ? post.tags.split(',').map(t => t.trim()).filter(Boolean)
            : typeof post.tag === 'string' && post.tag.trim() !== ''
                ? post.tag.split(',').map(t => t.trim()).filter(Boolean)
                : []

    const isBookmarked = state.bookmarks?.some(b => String(b.id) === String(post.id))

    const handleGoDetail = () => {
        if (post?.id) navigate(`/post/${post.id}`)
    }

    const handleBookmark = async () => {
        try {
            const result = await toggleBookmarkPost(post.id)
            dispatch(action.bookmarksAction(post))
            showSuccessAlert('Thông báo', result.message)
        } catch (error) {
            showErrorAlert('Lỗi', error.message)
        }
    }

    const dateStr = post.date || (post.createdAt
        ? new Date(post.createdAt.endsWith('Z') || post.createdAt.includes('+') ? post.createdAt : post.createdAt + 'Z').toLocaleDateString('vi-VN')
        : 'Mới đây')

    const readTime = post.readTime
        ? (typeof post.readTime === 'string' && post.readTime.includes('phút') ? post.readTime : `${post.readTime} phút đọc`)
        : '1 phút đọc'

    const tagColors = [
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300',
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-purple-950/40 dark:hover:text-purple-300',
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-green-950/40 dark:hover:text-green-300',
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-orange-950/40 dark:hover:text-orange-300',
    ]

    return (
        <article className="bg-white dark:bg-dark-surface rounded-md border border-gray-200 dark:border-gray-700/60 overflow-hidden hover:shadow-md hover:border-gray-400 dark:hover:border-blue-600/60 transition-all duration-200">

            {/* Cover image — full width, no horizontal padding */}
            {(post.coverImage || post.image) && (
                <div className="cursor-pointer overflow-hidden" onClick={handleGoDetail}>
                    <img
                        src={post.coverImage || post.image}
                        alt={post.title}
                        className="w-full h-52 object-cover hover:opacity-95 transition-opacity duration-300"
                    />
                </div>
            )}

            {/* Card body */}
            <div className="px-5 pt-4 pb-3">

                {/* Author row */}
                <div className="flex items-center gap-2.5 mb-3">
                    <img
                        src={displayAvatar}
                        alt={displayAuthor}
                        className="w-8 h-8 rounded-full object-cover border border-gray-100 dark:border-gray-700"
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">{displayAuthor}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dateStr} · {readTime}</p>
                    </div>
                </div>

                {/* Title */}
                <h2
                    onClick={handleGoDetail}
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug cursor-pointer hover:text-gray-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                >
                    {post.title}
                </h2>

                {/* Tags — dev.to style: no background, colored on hover */}
                {tagsList.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mb-3">
                        {tagsList.map((tag, idx) => (
                            <span
                                key={`tag-${tag}-${idx}`}
                                className={`text-sm text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-sm cursor-pointer transition-colors ${tagColors[idx % tagColors.length]}`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action bar */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors px-2 py-1.5 rounded-md text-sm">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{post.likes ?? 0} Reactions</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-blue-500 dark:hover:bg-blue-950/30 transition-colors px-2 py-1.5 rounded-md text-sm">
                            <FontAwesomeIcon icon={faComment} />
                            <span>{post.comments ?? 0} Comments</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleBookmark}
                            className={`p-1.5 rounded-md transition-colors ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                            title={isBookmarked ? 'Bỏ lưu' : 'Đọc sau'}
                        >
                            <FontAwesomeIcon icon={isBookmarked ? faBookmarkSolid : faBookmark} />
                        </button>
                        <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FontAwesomeIcon icon={faShareFromSquare} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default PostCard

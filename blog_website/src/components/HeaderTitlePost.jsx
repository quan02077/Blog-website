import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faCalendar,
    faUserCheck
} from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'

function HeaderTitlePost({ post }) {
    const [state] = useContext(Blog_context)

    // 1. Kiểm tra bài viết có phải của người đang đăng nhập hay không
    let isCurrentUserAuthor = false;
    if (state?.currentUser) {
        const currentUserId = String(state.currentUser.id || state.currentUser.Id || '').toLowerCase();
        const currentUserUsername = String(state.currentUser.username || '').toLowerCase();

        const postAuthorId = String(post?.authorId || '').toLowerCase();
        const postAuthorName = String(post?.authorName || '').toLowerCase();
        const postAuthor = String(post?.author || '').toLowerCase();

        if (postAuthorId && postAuthorId === currentUserId) {
            isCurrentUserAuthor = true;
        } else if (postAuthorName && postAuthorName === currentUserUsername) {
            isCurrentUserAuthor = true;
        } else if (postAuthor && postAuthor === currentUserUsername) {
            isCurrentUserAuthor = true;
        }
    }

    // 2. Xác định tên tác giả hiển thị
    let displayAuthor = 'Tác giả';
    if (post?.authorName) {
        displayAuthor = post.authorName;
    } else if (isCurrentUserAuthor && state.currentUser?.username) {
        displayAuthor = state.currentUser.username;
    } else if (post?.author?.username) {
        displayAuthor = post.author.username;
    } else if (post?.author && typeof post.author === 'string') {
        displayAuthor = post.author;
    }

    const displayDate = post?.date || (post?.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : 'Mới đây')
    const displayReadTime = post?.readTime ? `${post.readTime} phút đọc` : '1 phút đọc'

    // 3. Xác định avatar tác giả hiển thị
    let displayAvatar = `https://ui-avatars.com/api/?name=${displayAuthor}`;
    if (post?.authorAvatar) {
        displayAvatar = post.authorAvatar;
    } else if (post?.avatar) {
        displayAvatar = post.avatar;
    } else if (isCurrentUserAuthor && state.currentUser?.avatar) {
        displayAvatar = state.currentUser.avatar;
    }

    return (
        <>
            <header className="flex flex-col gap-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {post.title}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal italic border-l-4 border-blue-500 pl-4 py-1">
                    {post.summary}
                </p>

                {/* Thẻ Thông tin Tác giả */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3.5">
                        <img
                            src={displayAvatar}
                            alt={displayAuthor}
                            className="w-12 h-12 rounded-full ring-2 ring-blue-500/30 object-cover"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">{displayAuthor}</h3>
                                <span className="text-blue-500 text-xs">
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                                <span><FontAwesomeIcon icon={faCalendar} className="mr-1" />{displayDate}</span>
                                <span>•</span>
                                <span><FontAwesomeIcon icon={faClock} className="mr-1" />{displayReadTime}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- HERO COVER IMAGE --- */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                <img
                    src={post.coverImage || post.image}
                    alt={post.title}
                    className="w-full max-h-[450px] object-cover"
                />
            </div>
        </>
    )
}
export default HeaderTitlePost
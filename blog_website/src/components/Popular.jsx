import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faEye } from "@fortawesome/free-solid-svg-icons"

export function CompactPopularPost({ post, handleGoDetail }) {
    const viewsCount = post.views ?? post.viewCount ?? 0

    return (
        <div
            onClick={handleGoDetail}
            className="flex items-center gap-4 sm:gap-6 py-5 border-b border-gray-100 dark:border-gray-800/80 last:border-b-0 hover:bg-gray-50/40 dark:hover:bg-dark-surface-elevated/20 px-4 transition-colors group cursor-pointer"
        >
            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-400">
                    <span className="uppercase tracking-wider">
                        {post.category}
                    </span>
                    {post.date && (
                        <span className="text-gray-400 dark:text-gray-500 font-normal">
                            | {post.date}
                        </span>
                    )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:underline group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                </h3>

                {/* Meta Row: Author, Likes, Comments, Views */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{post.author}</span>
                    </div>

                    <span className="text-gray-300 dark:text-gray-700">|</span>

                    {/* Stats text with icons */}
                    <span className="flex items-center gap-1 font-medium">
                        <FontAwesomeIcon icon={faHeart} className="text-gray-400 text-[10px]" /> {post.likesCount ?? post.likes ?? 0}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                        <FontAwesomeIcon icon={faComment} className="text-gray-400 text-[10px]" /> {post.commentsCount ?? post.comments ?? 0}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                        <FontAwesomeIcon icon={faEye} className="text-gray-400 text-[10px]" /> {viewsCount} lượt xem
                    </span>
                </div>
            </div>

            {/* Thumbnail: Sharp Rectangle (no rounded corners) */}
            <div className="hidden sm:block shrink-0 border border-gray-100 dark:border-gray-800 w-32 h-20">
                <img
                    src={post.coverImage || post.image || 'https://picsum.photos/seed/post/400/200'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
            </div>
        </div>
    )
}
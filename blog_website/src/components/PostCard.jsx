import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'

function PostCard({ post }) {
    return (
        <article className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Post Image */}
            <div className="relative overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                </span>
            </div>

            {/* Post Body */}
            <div className="p-5">
                {/* Author & Date */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{post.author}</span>
                        <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
                    </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {post.description}
                </p>

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
                        <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                            <FontAwesomeIcon icon={faBookmark} />
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

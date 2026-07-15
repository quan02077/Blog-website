import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons"

export function FeaturedPopularPost({ post }) {
    return (
        <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            <div className="relative overflow-hidden h-72 sm:h-[400px]">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Rank Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                    <span className="text-blue-600">#{post.rank}</span>
                    <span>Đọc nhiều nhất</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {post.category}
                </div>

                {/* Featured Info (Bottom over image) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-gray-300 line-clamp-2 mb-5 max-w-3xl text-sm sm:text-base">
                        {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-white/20" alt={post.author} />
                            <div>
                                <p className="text-white font-semibold">{post.author}</p>
                                <p className="text-gray-400 text-xs">{post.date} · {post.readTime}</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-4 text-gray-300 font-medium">
                            <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><FontAwesomeIcon icon={faHeart} /> {post.likes}</span>
                            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><FontAwesomeIcon icon={faComment} /> {post.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export function CompactPopularPost({ post }) {
    return (
        <div className="flex items-center sm:items-start gap-4 sm:gap-6 p-4 rounded-xl group cursor-pointer hover:bg-gray-50 transition-colors">
            {/* Rank Number Large */}
            <div className="text-3xl sm:text-5xl font-black text-gray-100 group-hover:text-blue-100 transition-colors shrink-0 w-8 sm:w-16 text-center">
                {post.rank}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                        {post.category}
                    </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline flex items-center gap-1"><FontAwesomeIcon icon={faHeart} className="text-gray-300" /> {post.likes}</span>
                </div>
            </div>

            {/* Optional: Small thumbnail for visual variety (only visible on sm and up) */}
            <div className="hidden sm:block shrink-0">
                <img src={post.image} alt={post.title} className="w-24 h-24 rounded-lg object-cover group-hover:opacity-90 transition-opacity border border-gray-100" />
            </div>
        </div>
    )
}
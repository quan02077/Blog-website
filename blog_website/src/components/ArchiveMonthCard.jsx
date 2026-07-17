import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const catColors = {
    React: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    JavaScript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    TypeScript: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Next.js": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

function ArchiveMonthCard({ monthBlock }) {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Month Header */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">{monthBlock.month}</h3>
                <span className="text-xs text-gray-400">{monthBlock.posts.length} bài</span>
            </div>

            {/* Posts */}
            <div className="flex flex-col">
                {monthBlock.posts.map((post, index) => (
                    <div key={post.id}>
                        <div className="flex items-center gap-4 p-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:opacity-80 transition-opacity border border-gray-100 dark:border-gray-800"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-400">{post.date}</span>
                                    <span className="text-gray-200 dark:text-gray-700">·</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <FontAwesomeIcon icon={faClock} />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                            <span className={`hidden sm:inline-block text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${catColors[post.category] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                                {post.category}
                            </span>
                        </div>
                        {index < monthBlock.posts.length - 1 && (
                            <div className="h-px bg-gray-50 dark:bg-gray-800/50 mx-4" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArchiveMonthCard

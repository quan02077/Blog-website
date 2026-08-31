import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

function PopularCategoryCard({ cat, handleGoPosts }) {
    const postCount = cat.postCount ?? cat.postsCount ?? cat.posts ?? 0

    return (
        <div 
            onClick={handleGoPosts} 
            className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-2xl p-4 cursor-pointer group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4"
        >
            <div className="flex items-center gap-3.5 min-w-0">
                {/* Icon mặc định, tối giản */}
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-blue-900/20 text-gray-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-lg" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {cat.name}
                </h3>
            </div>

            {/* Badge số lượng bài viết */}
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 shrink-0">
                {postCount} bài viết
            </span>
        </div>
    )
}

export default PopularCategoryCard

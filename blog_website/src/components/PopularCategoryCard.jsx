import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PopularCategoryCard({ cat }) {
    return (
        <div className={`${cat.color} border rounded-2xl p-5 cursor-pointer group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-start gap-4`}>
            {/* Icon box */}
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2d3148] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={cat.icon} className={`text-xl ${cat.iconColor}`} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                        {cat.posts} bài
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{cat.description}</p>
            </div>
        </div>
    )
}

export default PopularCategoryCard

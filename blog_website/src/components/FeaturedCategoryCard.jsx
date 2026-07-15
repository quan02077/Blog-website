import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FeaturedCategoryCard({ cat }) {
    return (
        <div className={`relative bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-white overflow-hidden cursor-pointer group hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300`}>
            {/* Badge */}
            <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.badgeColor} text-white`}>
                {cat.badge}
            </span>

            {/* Decorative large icon background */}
            <FontAwesomeIcon icon={cat.icon} className="text-white/30 text-6xl absolute bottom-4 right-6 group-hover:text-white/40 transition-colors" />

            {/* Main icon */}
            <FontAwesomeIcon icon={cat.icon} className="text-3xl mb-3 text-white/80" />

            <h3 className="text-xl font-extrabold mb-1">{cat.name}</h3>
            <p className="text-white/70 text-sm line-clamp-2 mb-3">{cat.description}</p>
            <div className="flex items-center gap-2">
                <span className="text-white/90 font-bold text-2xl">{cat.posts}</span>
                <span className="text-white/60 text-sm">bài viết</span>
            </div>
        </div>
    )
}

export default FeaturedCategoryCard

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faPaperPlane, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons'

const catColors = {
    React: "bg-blue-100 text-blue-700",
    JavaScript: "bg-yellow-100 text-yellow-700",
    CSS: "bg-pink-100 text-pink-700",
    TypeScript: "bg-purple-100 text-purple-700",
}

function DraftCard({ draft }) {
    return (
        <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group">
            {/* Cover Image */}
            <div className="sm:w-52 sm:shrink-0 overflow-hidden">
                <img
                    src={draft.image}
                    alt={draft.title}
                    className="w-full h-40 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Card Body */}
            <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                <div>
                    {/* Category + Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${catColors[draft.category] ?? 'bg-gray-100 text-gray-600'}`}>
                            {draft.category}
                        </span>
                        {draft.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {draft.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 line-clamp-2">{draft.excerpt}</p>
                </div>

                {/* Meta + Actions */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faCalendar} />
                            {draft.lastEdited}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faClock} />
                            {draft.readTime} đọc
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Sửa
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            Đăng
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default DraftCard

import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faPaperPlane, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons'
import * as action from '../context/Actions'
import { showConfirmAlert, showSuccessAlert } from '../utils/alert'
import { useContext } from 'react'
import Blog_context from '../context/Blog_Context'

const catColors = {
    React: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    JavaScript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    TypeScript: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
}

function DraftCard({ draft }) {
    const [, dispatch] = useContext(Blog_context)
    const navigate = useNavigate()
    const tagsList = Array.isArray(draft.tags)
        ? draft.tags
        : typeof draft.tag === 'string' && draft.tag.trim() !== ''
            ? draft.tag.split(',').map(t => t.trim()).filter(Boolean)
            : []

    const excerptText = draft.excerpt || draft.summary || draft.description || ''
    const dateText = draft.lastEdited || draft.date || 'Mới đây'
    const timeText = (draft.updatedAt || draft.createdAt)
        ? new Date(draft.updatedAt || draft.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        : ''

    const handleDelete = async (draftID) => {
        const result = await showConfirmAlert('Xóa bản nháp', 'Bạn có chắc chắn muốn xóa bản nháp này?')
        if (result.isConfirmed) {
            dispatch(action.deleteDraftsAction(draftID))
            showSuccessAlert('Thành công', 'Đã xóa bản nháp thành công!')
        }
    }

    const handleUpdate = (draftID) => {
        navigate(`/write/${draftID}`)
    }

    return (
        <article className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-dark-bg/50 transition-all duration-300">
            {/* Cover Image */}
            <div className="sm:w-52 sm:shrink-0 overflow-hidden">
                <img
                    src={draft.image || 'https://picsum.photos/seed/draft/400/200'}
                    alt={draft.title || 'Bản nháp'}
                    className="w-full h-40 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Card Body */}
            <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                <div>
                    {/* Category + Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${catColors[draft.category] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {draft.category || 'Chưa phân loại'}
                        </span>
                        {tagsList.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {draft.title || 'Bài viết chưa có tiêu đề'}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{excerptText}</p>
                </div>

                {/* Meta + Actions */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faCalendar} />
                            {dateText}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faClock} />
                            {timeText}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleUpdate(draft.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Sửa
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            Đăng
                        </button>
                        <button
                            onClick={() => handleDelete(draft.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-3 py-1.5 rounded-lg transition-colors">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default DraftCard

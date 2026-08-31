import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faClock, faCalendar, faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as action from '../context/Actions'
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from '../utils/alert'
import { useContext, useState } from 'react'
import Blog_context from '../context/Blog_Context'
import { deleteDraft_Post } from '../api/post'

function DraftCard({ draft }) {
    const [, dispatch] = useContext(Blog_context)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const tagsList = Array.isArray(draft.tags)
        ? draft.tags
        : typeof draft.tag === 'string' && draft.tag.trim() !== ''
            ? draft.tag.split(',').map(t => t.trim()).filter(Boolean)
            : []

    const excerptText = draft.excerpt || draft.summary || draft.description || ''
    
    const rawDateStr = draft.updatedAt || draft.createdAt
    const dateVal = rawDateStr 
        ? new Date(rawDateStr.endsWith('Z') || rawDateStr.includes('+') ? rawDateStr : rawDateStr + 'Z')
        : null

    const dateText = dateVal 
        ? dateVal.toLocaleDateString('vi-VN') 
        : (draft.lastEdited || draft.date || 'Mới đây')

    const timeText = dateVal
        ? dateVal.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        : ''

    const handleDelete = async (draftID) => {
        const result = await showConfirmAlert('Xóa bản nháp', 'Bạn có chắc chắn muốn xóa bản nháp này?')
        if (result.isConfirmed) {
            setLoading(true);
            try {
                await deleteDraft_Post(draftID);
                dispatch(action.deleteDraftsAction(draftID));
                await showSuccessAlert('Thành công', 'Đã xóa bản nháp thành công!');
            } catch (error) {
                await showErrorAlert('Lỗi', error.message);
            } finally {
                setLoading(false);
            }
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
                    src={draft.coverImage || draft.image || 'https://picsum.photos/seed/draft/400/200'}
                    alt={draft.title || 'Bản nháp'}
                    className="w-full h-40 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Card Body */}
            <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                <div>
                    {/* Category + Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            {draft.categoryName || draft.category || 'Chưa phân loại'}
                        </span>
                        {tagsList.map((tag, idx) => (
                            <span key={`tag-${tag}-${idx}`} className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5 line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-blue-400 transition-colors">
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
                        <button
                            onClick={() => handleDelete(draft.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-3 py-1.5 rounded-lg transition-colors"
                            disabled={loading}
                        >
                            {loading ? (
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            ) : (
                                <FontAwesomeIcon icon={faTrashCan} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default DraftCard

import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faClock, faChevronDown, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

function PostMeta({ newCategory, setNewCategory, selectedCategory, setSelectedCategory, isAddingNew, setIsAddingNew, tag, setTag, readTime }) {
    const [state, dispatch] = useContext(Blog_context)
    const { categories } = state

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            const trimmed = newCategory.trim()
            if (!categories.includes(trimmed)) {
                dispatch(action.createCategoryAction(trimmed))
            }
            setSelectedCategory(trimmed)
            setNewCategory('')
            setIsAddingNew(false)
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Chuyên mục</label>
                    <button
                        type="button"
                        onClick={() => setIsAddingNew(!isAddingNew)}
                        className="text-xs font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                        <FontAwesomeIcon icon={isAddingNew ? faTimes : faPlus} />
                        {isAddingNew ? 'Hủy' : 'Tạo mới'}
                    </button>
                </div>

                {isAddingNew ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Tên chuyên mục mới..."
                            className="w-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 outline-none bg-white dark:bg-dark-bg"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                        />
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
                        >
                            Thêm
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer"
                        >
                            <option value="">Chọn chuyên mục...</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 items-center gap-2">
                    <FontAwesomeIcon icon={faTag} className="text-gray-400 dark:text-gray-500" />
                    Tags
                </label>
                <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault())}
                    type="text"
                    placeholder="react, javascript, css..."
                    className="w-full text-sm text-gray-600 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 outline-none bg-white dark:bg-dark-bg"
                />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Phân cách bằng dấu phẩy, tối đa 5 tags</p>
            </div>

            {/* Reading time preview */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-gray-400 dark:text-gray-500" />
                    Thời gian đọc ước tính
                </label>
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg rounded-xl px-4 py-2.5">
                    <span className="text-2xl font-black text-blue-500 dark:text-blue-400">{readTime}</span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">phút đọc</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Tự động tính từ nội dung</p>
            </div>
        </div>
    )
}

export default PostMeta

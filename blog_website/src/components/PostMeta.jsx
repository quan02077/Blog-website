import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faClock, faChevronDown, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import ClearInputButton from './ClearInputButton'
import { createCategory } from '../api/category'
import { showSuccessAlert, showErrorAlert } from '../utils/alert'

function PostMeta({ newCategory, setNewCategory, selectedCategory, setSelectedCategory, isAddingNew, setIsAddingNew, tag, setTag, readTime }) {
    const [state, dispatch] = useContext(Blog_context)
    const { categories } = state

    const handleAddCategory = async () => {
        if (newCategory.trim() !== '') {
            const trimmed = newCategory.trim()

            // Vì categories là mảng Object [{id, name}] nên dùng .some để kiểm tra trùng tên
            const isExist = categories.some(cat => (cat?.name || cat).toLowerCase() === trimmed.toLowerCase())

            if (!isExist) {
                try {
                    const data = await createCategory(trimmed)
                    dispatch(action.createCategoryAction(data))
                    showSuccessAlert('Thêm chuyên mục thành công')
                    setSelectedCategory(data.id) // Gán bằng ID của danh mục vừa tạo
                } catch (error) {
                    showErrorAlert(error.message || 'Không thể tạo chuyên mục')
                }
            } else {
                showErrorAlert('Chuyên mục đã tồn tại')
                // Nếu đã tồn tại, tìm lại ID của danh mục cũ để tự động chọn
                const existingCat = categories.find(cat => (cat?.name || cat).toLowerCase() === trimmed.toLowerCase())
                if (existingCat) {
                    setSelectedCategory(existingCat?.id || existingCat)
                }
            }
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
                        className="text-xs font-semibold text-gray-900 hover:text-black dark:text-gray-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                        <FontAwesomeIcon icon={isAddingNew ? faTimes : faPlus} />
                        {isAddingNew ? 'Hủy' : 'Tạo mới'}
                    </button>
                </div>

                {isAddingNew ? (
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Tên chuyên mục mới..."
                                className="w-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 pr-8 py-2 outline-none bg-white dark:bg-dark-bg"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                            />
                            <ClearInputButton value={newCategory} onClear={() => setNewCategory('')} className="right-2.5" />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
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
                            {categories.map((cat, idx) => {
                                const catId = cat?.id || cat;
                                const catName = cat?.name || cat;
                                return (
                                    <option key={catId || idx} value={catId}>
                                        {catName}
                                    </option>
                                );
                            })}
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
                <div className="relative">
                    <input
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault())}
                        type="text"
                        placeholder="react, javascript, css..."
                        className="w-full text-sm text-gray-600 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 border border-gray-200 dark:border-gray-700 rounded-xl px-3 pr-8 py-2.5 outline-none bg-white dark:bg-dark-bg"
                    />
                    <ClearInputButton value={tag} onClear={() => setTag('')} className="right-3" />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Phân cách bằng dấu phẩy, tối đa 5 tags</p>
            </div>

            {/* Reading time preview */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-gray-400 dark:text-gray-500" />
                    Thời gian đọc ước tính
                </label>
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg rounded-xl px-4 py-2.5">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{readTime}</span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">phút đọc</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Tự động tính từ nội dung</p>
            </div>
        </div>
    )
}

export default PostMeta

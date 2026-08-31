import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Blog_context from '../context/Blog_Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PopularCategoryCard from '../components/PopularCategoryCard'
// import { popularCategories } from '../data/categoriesData'

function Categories() {
    const navigate = useNavigate()
    const [state] = useContext(Blog_context)
    const { categories } = state
    const handleGoPosts = (category) => {
        if (category) {
            navigate(`/posts/${category}`)
        }
    }
    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">Chuyên mục</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Khám phá tất cả các chủ đề và chuyên mục bài viết</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm chuyên mục..."
                        readOnly
                        className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder-gray-300 dark:placeholder-gray-600"
                    />
                </div>
            </div>

            {/* All Categories */}
            <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Tất cả chuyên mục</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat, index) => (
                        <PopularCategoryCard key={cat.id || index} cat={cat} handleGoPosts={() => handleGoPosts(cat.name)} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Categories

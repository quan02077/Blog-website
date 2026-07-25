import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DraftCard from '../components/DraftCard'
import DraftEmptyState from '../components/DraftEmptyState'
import Blog_context from '../context/Blog_Context'
function Drafts() {
    const [state] = useContext(Blog_context)
    const { drafts } = state
    const isEmpty = drafts.length === 0

    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon icon={faFileLines} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">Bản nháp</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{drafts.length} bài chưa được đăng</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-48">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bản nháp..."
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder-gray-300 dark:placeholder-gray-600"
                    />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer">
                        <option>Tất cả chuyên mục</option>
                        <option>React</option>
                        <option>JavaScript</option>
                        <option>CSS</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer">
                        <option>Chỉnh sửa gần nhất</option>
                        <option>Cũ nhất</option>
                        <option>A → Z</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
            </div>

            {/* Draft List or Empty State */}
            {isEmpty ? (
                <DraftEmptyState />
            ) : (
                <div className="flex flex-col gap-4">
                    {drafts.map((draft) => (
                        <DraftCard key={draft.id} draft={draft} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Drafts
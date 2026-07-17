import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFloppyDisk, faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons'

function WritePostHeader() {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">Viết bài mới</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Chia sẻ kiến thức của bạn với cộng đồng</p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faEye} />
                    Preview
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    Lưu nháp
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Đăng bài
                </button>
            </div>
        </div>
    )
}

export default WritePostHeader

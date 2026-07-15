import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFloppyDisk, faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons'

function WritePostHeader() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 leading-none mb-0.5">Viết bài mới</h1>
                    <p className="text-sm text-gray-500">Chia sẻ kiến thức của bạn với cộng đồng</p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faEye} />
                    Preview
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    Lưu nháp
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Đăng bài
                </button>
            </div>
        </div>
    )
}

export default WritePostHeader

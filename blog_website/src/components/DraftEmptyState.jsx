import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'

function DraftEmptyState() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-5">
                <FontAwesomeIcon icon={faInbox} className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Chưa có bản nháp nào</h3>
            <p className="text-sm text-gray-400 max-w-xs">
                Các bài viết bạn lưu nháp sẽ hiển thị ở đây. Bắt đầu viết bài ngay!
            </p>
        </div>
    )
}

export default DraftEmptyState

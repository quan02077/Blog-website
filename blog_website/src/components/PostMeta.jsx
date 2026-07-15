import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faClock, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function PostMeta() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Chuyên mục</label>
                <div className="relative">
                    <select className="w-full appearance-none text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white cursor-pointer">
                        <option>Chọn chuyên mục...</option>
                        <option>React</option>
                        <option>JavaScript</option>
                        <option>CSS</option>
                        <option>TypeScript</option>
                        <option>Next.js</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTag} className="text-gray-400" />
                    Tags
                </label>
                <input
                    type="text"
                    placeholder="react, javascript, css..."
                    readOnly
                    className="w-full text-sm text-gray-600 placeholder-gray-300 border border-gray-200 rounded-xl px-3 py-2.5 outline-none"
                />
                <p className="text-xs text-gray-400 mt-2">Phân cách bằng dấu phẩy, tối đa 5 tags</p>
            </div>

            {/* Reading time preview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                    Thời gian đọc ước tính
                </label>
                <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2.5">
                    <span className="text-2xl font-black text-blue-500">~5</span>
                    <span className="text-sm text-gray-400">phút đọc</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Tự động tính từ nội dung</p>
            </div>
        </div>
    )
}

export default PostMeta

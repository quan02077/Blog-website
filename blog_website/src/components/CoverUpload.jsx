import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

function CoverUpload() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Ảnh bìa</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                    <FontAwesomeIcon icon={faImage} className="text-2xl text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Kéo thả ảnh vào đây</p>
                <p className="text-xs text-gray-400">
                    hoặc <span className="text-blue-500 font-medium">click để chọn</span> — PNG, JPG, WebP (tối đa 5MB)
                </p>
            </div>
        </div>
    )
}

export default CoverUpload

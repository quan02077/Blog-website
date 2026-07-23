import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons'

function CoverUpload({ image, setImage }) {
    const fileInputRef = useRef(null)
    const handleFileSelect = (e => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    })
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6" onClick={() => fileInputRef.current?.click()}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Ảnh bìa</label>
            {image ? (
                <div className="relative">
                    <img src={image} alt="cover" className="w-full h-64 object-cover rounded-xl" />
                    <button
                        type="button"
                        className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation()
                            setImage(null)
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <FontAwesomeIcon icon={faImage} className="text-2xl text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Kéo thả ảnh vào đây</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        hoặc <span className="text-blue-500 dark:text-blue-400 font-medium">click để chọn</span> — PNG, JPG, WebP (tối đa 5MB)
                    </p>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    )
}

export default CoverUpload

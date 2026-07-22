import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons"

function AvatarInput({ avatar, setAvatar }) {
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="relative w-28 h-28 mx-auto mb-4">
            {avatar ? (
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 shadow-md"
                />
            ) : (
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400 text-4xl dark:text-gray-500 hover:text-gray-200" />
                </div>
            )}
            <button
                type="button"
                className="absolute bottom-0 right-0 w-9 h-9 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-dark-surface cursor-pointer transition-transform hover:scale-110"
                onClick={() => fileInputRef.current?.click()}
                title="Đổi ảnh đại diện"
            >
                <FontAwesomeIcon icon={faCamera} />
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}
export default AvatarInput
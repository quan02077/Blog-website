import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

function ClearInputButton({ value, onClear, className = "right-3" }) {
    if (!value || String(value).length === 0) return null

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClear()
            }}
            className={`absolute ${className} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 cursor-pointer z-10 flex items-center justify-center`}
            title="Xóa"
        >
            <FontAwesomeIcon icon={faCircleXmark} className="text-sm" />
        </button>
    )
}

export default ClearInputButton

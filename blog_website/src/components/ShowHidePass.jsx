import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ShowHidePass({ show, setShow }) {
    return (
        <button
            type="button"
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer'
            onClick={() => setShow(!show)}
        >
            {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
    )
}

export default ShowHidePass
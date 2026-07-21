import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Blog_context from "../context/Blog_Context"
function AccountTool() {
    const [state] = useContext(Blog_context)
    const { currentUser } = state
    if (!state.btnAccount) return null
    return (
        <div className="absolute right-0 top-full mt-2 w-56 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className='bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700'>
                <h3 className='font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 truncate'>
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    {currentUser ? currentUser.username : 'Tài khoản của tôi'}
                </h3>
                <hr className='border-gray-200 dark:border-gray-700 mt-3 mb-2' />
                <button className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    Đăng xuất
                </button>
            </div>
        </div>
    )
}
export default AccountTool
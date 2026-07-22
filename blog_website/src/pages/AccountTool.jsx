import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { faCircleInfo, faGear } from "@fortawesome/free-solid-svg-icons"
import Blog_context from "../context/Blog_Context"
import * as action from "../context/Actions"
import { showConfirmAlert, showSuccessAlert } from "../utils/alert"
function AccountTool() {
    const [state, dispatch] = useContext(Blog_context)
    const { currentUser } = state
    if (!state.btnAccount) return null
    return (
        <div className="absolute right-0 top-full mt-2 w-56 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className='bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700'>
                <h3 className='font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 truncate'>
                    {currentUser?.avatar ? (
                        <img src={currentUser.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-gray-300 dark:border-gray-700" />
                    ) : (
                        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    )}
                    {currentUser ? currentUser.username : 'Tài khoản của tôi'}
                </h3>
                <hr className='border-gray-200 dark:border-gray-700 my-3' />
                <div className="flex flex-col my-4">
                    <button onClick={() => {
                        dispatch(action.toggleInfoAction(true))
                        dispatch(action.toggleAccountAction(false))
                    }} className='btnTool'>
                        <FontAwesomeIcon icon={faCircleInfo} className="text-gray-500" />
                        <span>Thông tin tài khoản</span>
                    </button>
                    <button className='btnTool'>
                        <FontAwesomeIcon icon={faNewspaper} className="text-gray-500" />
                        <span>Bài viết của tôi</span>
                    </button>
                    <button className='btnTool'>
                        <FontAwesomeIcon icon={faGear} className="text-gray-500" />
                        <span>Cài đặt</span>
                    </button>
                </div>
                <hr className='border-gray-200 dark:border-gray-700 my-3' />
                <div className='flex justify-center'>
                    <button
                        className="w-fit h-fit rounded-full border border-gray-300 dark:border-red-500 bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-900 hover:transition-all duration-200 hover:-translate-y-1.5 hover:underline cursor-pointer hover:shadow-lg dark:shadow-red-900/20"
                        onClick={() => {
                            showConfirmAlert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?')
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        dispatch(action.logOutAction());
                                        showSuccessAlert('Đăng xuất', 'Bạn đã đăng xuất thành công');
                                    }
                                })
                        }}
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div >
    )
}
export default AccountTool
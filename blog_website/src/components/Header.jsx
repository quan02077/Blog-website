import { useContext } from 'react'
import Blog_context from '../context/Blog_Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import * as action from '../context/Actions'
import AccountTool from '../pages/AccountTool'

function Header() {
    const [state, dispatch] = useContext(Blog_context)

    return (
        <header className="grid grid-cols-3 gap-4 p-4 border-b border-gray-300 dark:border-gray-800 shadow-md sticky top-0 bg-white dark:bg-dark-surface z-10 shrink-0">
            <div className="col-span-1">
                <h1 className="font-pixel font-bold text-2xl text-gray-900 dark:text-white">My Blog</h1>
                <p className="text-gray-500 dark:text-gray-400">Nơi chia sẻ kiến thức và kinh nghiệm</p>
            </div>
            <div className="col-span-1">
                <input className="w-full h-full rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="col-span-1 flex justify-end items-center gap-4">
                <button
                    onClick={() => dispatch(action.toggleDarkModeAction(!state.darkMode))}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer text-gray-700 dark:text-gray-300"
                    title="Chế độ tối"
                >
                    <FontAwesomeIcon icon={state.darkMode ? faSun : faMoon} className="text-xl" />
                </button>
                {state.isSignIn && (
                    <div className="relative">
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer text-gray-700 dark:text-gray-300"
                            title="Tài khoản"
                            onClick={() => dispatch(action.toggleAccountAction(!state.btnAccount))}
                        >
                            <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                        </button>
                        <AccountTool />
                    </div>
                )}
                {!state.isSignIn && <button
                    className="w-fit h-fit rounded-full border border-gray-300 dark:border-blue-500 bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-900 hover:transition-all duration-200 hover:-translate-y-1.5 hover:underline cursor-pointer hover:shadow-lg dark:shadow-blue-900/20"
                    onClick={() => dispatch(action.btnSignInUpAction(true))}
                >
                    Đăng nhập/Đăng ký
                </button>}
            </div>
        </header>
    )
}

export default Header
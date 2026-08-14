import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import Login from '../components/Login'
import Register from '../components/Register'
import ForgotPassword from '../components/ForgotPassword'

function SignIn_Up() {
    const [state, dispatch] = useContext(Blog_context)
    const [view, setView] = useState('login') // 'login', 'register', 'forgot'

    if (!state.btnSignInUp) return null

    const handleClose = () => {
        dispatch(action.btnSignInUpAction(false));
        setTimeout(() => setView('login'), 300);
    }

    const activeBtn = ({ targetView }) => targetView === view ? 'isActive' : 'isNoActive'

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleClose}
        >
            <div
                className='bg-light-bg dark:bg-dark-bg rounded-2xl shadow-2xl w-full max-w-md mx-auto relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800'
                onClick={(e) => e.stopPropagation()}>
                {/* Phần Header (Tabs hoặc Tiêu đề) */}
                {view === 'forgot' ? (
                    <div className="px-8 pt-8 pb-0">
                        <button
                            onClick={() => setView('login')}
                            className="text-gray-500 hover:text-primary mb-4 flex items-center gap-2 text-sm font-semibold transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quên mật khẩu</h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
                        </p>
                    </div>
                ) : (
                    <div className='flex items-center text-center px-8 pt-6 border-b border-gray-200 dark:border-gray-800'>
                        <button
                            onClick={() => setView('login')}
                            className={`signin_upBtn hoverButton ${activeBtn({ targetView: 'login' })}`}
                        >
                            ĐĂNG NHẬP
                            {view === 'login' && <div className="txt_signin_upBtn bg-primary" />}
                        </button>
                        <button
                            onClick={() => setView('register')}
                            className={`signin_upBtn hoverButton ${activeBtn({ targetView: 'register' })}`}
                        >
                            ĐĂNG KÝ
                            {view === 'register' && <div className="txt_signin_upBtn bg-primary" />}
                        </button>
                    </div>
                )}

                {/* Render Component tương ứng */}
                <div>
                    {view === 'login' && <Login setView={setView} />}
                    {view === 'register' && <Register setView={setView} />}
                    {view === 'forgot' && <ForgotPassword />}
                </div>
            </div>
        </div >
    )
}

export default SignIn_Up
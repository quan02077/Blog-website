import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showSuccessAlert } from '../utils/alert'
import ShowHidePass from './ShowHidePass'

function Register() {
    const [dispatch] = useContext(Blog_context)
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="p-8">
            <form className="space-y-4">
                <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                    <label className="auth-label">Họ và Tên</label>
                    <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="auth-icon" />
                        <input
                            value={username}
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="auth-input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="auth-label">Email</label>
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
                        <input
                            value={email}
                            type="email"
                            placeholder="example@gmail.com"
                            className="auth-input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                    <label className="auth-label">Mật khẩu</label>
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="auth-icon" />
                        <input
                            value={password}
                            type={show ? "text" : "password"}
                            placeholder={show ? "Mật khẩu" : "••••••••"}
                            className="auth-input pr-12"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ShowHidePass show={show} setShow={setShow} />
                    </div>
                </div>

                <button
                    type="button"
                    className="auth-btn-main mt-4"
                    onClick={() => {
                        const newUser = {
                            username,
                            email,
                            password
                        }
                        dispatch(action.registerAction(newUser))
                        showSuccessAlert('Thông báo', 'Đăng ký thành công')
                    }}
                >
                    Tạo tài khoản
                </button>
            </form>

            <div className="relative mt-8 mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-light-bg dark:bg-dark-bg text-gray-500 font-medium">Hoặc tiếp tục với</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <button type="button" className="auth-btn-social">
                    <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
                </button>
                <button type="button" className="auth-btn-social">
                    <FontAwesomeIcon icon={faGithub} className="text-gray-900 dark:text-white text-lg" />
                </button>
                <button type="button" className="auth-btn-social">
                    <FontAwesomeIcon icon={faFacebook} className="text-primary text-lg" />
                </button>
            </div>
        </div>
    )
}

export default Register

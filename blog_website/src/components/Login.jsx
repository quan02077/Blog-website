import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showErrorAlert, showSuccessAlert } from '../utils/alert'
import ShowHidePass from './ShowHidePass'

function Login({ setView }) {
    const [, dispatch] = useContext(Blog_context)
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            showErrorAlert('Thông báo', 'Vui lòng nhập email và mật khẩu')
            return
        }
        setLoading(true)
        try {
            const response = await fetch("http://localhost:5264/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Email hoặc mật khẩu không đúng')
            }
            const data = await response.json()
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            const loggedUser = data.user || data
            dispatch(action.loginAction(loggedUser))
            showSuccessAlert('Thông báo', 'Đăng nhập thành công')
        } catch (error) {
            showErrorAlert('Thông báo', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8">
            <form className="space-y-4" onSubmit={handleLogin}>
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

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="auth-label">Mật khẩu</label>
                        <button
                            type="button"
                            onClick={() => setView('forgot')}
                            className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
                        >
                            Quên mật khẩu?
                        </button>
                    </div>
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
                    type="submit"
                    className="auth-btn-main mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
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

export default Login
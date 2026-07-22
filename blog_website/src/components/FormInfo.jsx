import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import ShowHidePass from "./ShowHidePass"

function FormInfo({ username, setUsername, email, setEmail, password, setPassword }) {
    const [show, setShow] = useState(false)
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
        </form>
    )
}
export default FormInfo
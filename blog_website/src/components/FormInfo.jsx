import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import ShowHidePass from "./ShowHidePass"
import ClearInputButton from "./ClearInputButton"

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
                        className="auth-input pr-10"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <ClearInputButton value={username} onClear={() => setUsername('')} />
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
                        className="auth-input pr-10"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ClearInputButton value={email} onClear={() => setEmail('')} />
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
                        className="auth-input pr-20"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ClearInputButton value={password} onClear={() => setPassword('')} className="right-10" />
                    <ShowHidePass show={show} setShow={setShow} />
                </div>
            </div>
        </form>
    )
}
export default FormInfo
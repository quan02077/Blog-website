import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function ForgotPassword() {
    return (
        <div className="p-8">
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <label className="auth-label">Email khôi phục</label>
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="auth-input"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="auth-btn-main mt-4"
                >
                    Gửi liên kết khôi phục
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword

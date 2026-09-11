import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { showErrorAlert, showSuccessAlert } from '../utils/alert';
import ClearInputButton from './ClearInputButton';
import { forgotPasswordApi, resetPasswordApi } from '../api/auth';

function ForgotPassword({ setView }) {
    const [step, setStep] = useState(1); // 1: nhập email, 2: nhập mật khẩu mới
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(''); // lưu reset token nhận từ api
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // bước 1: gửi email xin token
    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!email) {
            showErrorAlert("Thông báo", "Vui lòng nhập Email!");
            return;
        }
        setLoading(true);
        try {
            const data = await forgotPasswordApi(email);
            showSuccessAlert("Thành công", data.message);
            setToken(data.resetToken); // nhận token trực tiếp từ api (chế độ dev)
            setStep(2); // chuyển sang bước 2
        } catch (error) {
            showErrorAlert("Lỗi", error.message);
        } finally {
            setLoading(false);
        }
    };

    // bước 2: gửi mật khẩu mới kèm token lên đổi
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            showErrorAlert("Thông báo", "Vui lòng nhập mật khẩu mới!");
            return;
        }
        setLoading(true);
        try {
            await resetPasswordApi(email, token, newPassword);
            showSuccessAlert("Thành công", "Đặt lại mật khẩu thành công!");
            setView('login'); // đổi thành công quay lại trang đăng nhập
        } catch (error) {
            showErrorAlert("Lỗi", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            {step === 1 ? (
                // form bước 1: nhập email
                <form className="space-y-4" onSubmit={handleSendEmail}>
                    <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                        <label className="auth-label">Email tài khoản</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input pl-10 pr-10"
                                placeholder="example@gmail.com"
                                required
                            />
                            <ClearInputButton value={email} onClear={() => setEmail('')} />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="auth-btn-main mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? 'Đang gửi yêu cầu...' : 'Xác nhận Email'}
                    </button>
                </form>
            ) : (
                // form bước 2: nhập mật khẩu mới
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                        <label className="auth-label">Mật khẩu mới</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faLock} className="auth-icon" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="auth-input pl-10 pr-10"
                                placeholder="••••••••"
                                required
                            />
                            <ClearInputButton value={newPassword} onClear={() => setNewPassword('')} />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="auth-btn-main mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;

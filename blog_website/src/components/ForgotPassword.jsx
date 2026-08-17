import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { showErrorAlert, showSuccessAlert } from '../utils/alert';
import { forgotPasswordApi, resetPasswordApi } from '../api/auth';

function ForgotPassword({ setView }) {
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mật khẩu mới
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(''); // Lưu Reset Token nhận từ API
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Bước 1: Gửi email xin token
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
            setToken(data.resetToken); // Nhận token trực tiếp từ API (Chế độ Dev)
            setStep(2); // Chuyển sang bước 2
        } catch (error) {
            showErrorAlert("Lỗi", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Bước 2: Gửi mật khẩu mới kèm token lên đổi
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
            setView('login'); // Đổi thành công quay lại trang đăng nhập
        } catch (error) {
            showErrorAlert("Lỗi", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            {step === 1 ? (
                // FORM BƯỚC 1: NHẬP EMAIL
                <form className="space-y-4" onSubmit={handleSendEmail}>
                    <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                        <label className="auth-label">Email tài khoản</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input pl-10"
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="auth-btn-main mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? 'Đang gửi yêu cầu...' : 'Xác nhận Email'}
                    </button>
                </form>
            ) : (
                // FORM BƯỚC 2: NHẬP MẬT KHẨU MỚI
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-1.5 animate-in slide-in-from-right-4 duration-300">
                        <label className="auth-label">Mật khẩu mới</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faLock} className="auth-icon" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="auth-input pl-10"
                                placeholder="••••••••"
                                required
                            />
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

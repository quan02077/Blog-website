import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import AvatarInput from "./AvatarInput"
import FormInfo from "./FormInfo"
import * as action from "../context/Actions"
import { showSuccessAlert, showErrorAlert } from "../utils/alert"
import { editProfile } from "../api/editProfile"


function EditForm({ currentUser, dispatch, onClose }) {
    const [username, setUsername] = useState(currentUser?.username || '');
    const [bio, setBio] = useState(currentUser?.bio || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState(currentUser?.password || '');
    const [avatar, setAvatar] = useState(currentUser?.avatar || null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedUser = {
                username,
                bio,
                email,
                password,
                avatar: avatar
            };

            const data = await editProfile(updatedUser);
            dispatch(action.updateInfoAction(data));
            showSuccessAlert('Thông báo', 'Cập nhật thông tin tài khoản thành công!');
            onClose();
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chỉnh sửa hồ sơ</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                </div>

                <AvatarInput avatar={avatar} setAvatar={setAvatar} />

                <div className="space-y-4 my-4">
                    <FormInfo
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Tiểu sử (Bio)</label>
                            {bio && (
                                <button
                                    type="button"
                                    onClick={() => setBio('')}
                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Nhập giới thiệu bản thân..."
                            rows="2"
                            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 resize-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditForm

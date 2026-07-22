import { useContext, useState } from "react"
import AvatarInput from "../components/AvatarInput"
import FormInfo from "../components/FormInfo"
import * as action from "../context/Actions"
import Blog_context from "../context/Blog_Context"
import { showSuccessAlert } from "../utils/alert"

function InfoContent({ currentUser, dispatch }) {
    const [username, setUsername] = useState(currentUser?.username || '')
    const [email, setEmail] = useState(currentUser?.email || '')
    const [password, setPassword] = useState(currentUser?.password || '')
    const [avatar, setAvatar] = useState(currentUser?.avatar || null)

    const handleSave = () => {
        const updatedUser = {
            ...currentUser,
            username,
            email,
            password,
            avatar
        }
        dispatch(action.updateInfoAction(updatedUser))
        showSuccessAlert('Thông báo', 'Cập nhật thông tin thành công')
    }

    return (
        <div 
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 animate-in slide-in-from-top-2 fade-in duration-200" 
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-4">Thông tin tài khoản</h3>
            <AvatarInput avatar={avatar} setAvatar={setAvatar} />
            <FormInfo
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
            <div className="flex justify-center gap-4 mt-6">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => dispatch(action.toggleInfoAction(false))}
                >
                    Hủy
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                    onClick={handleSave}
                >
                    Lưu
                </button>
            </div>
        </div>
    )
}

function Info() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnInfo, currentUser } = state

    if (!btnInfo) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleInfoAction(false))}
        >
            <InfoContent key={currentUser?.email || 'info'} currentUser={currentUser} dispatch={dispatch} />
        </div>
    )
}

export default Info
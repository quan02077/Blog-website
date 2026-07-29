import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faComment, faHeart, faXmark, faCheckDouble, faBullhorn } from "@fortawesome/free-solid-svg-icons"
import Blog_context from "../context/Blog_Context"
import * as action from "../context/Actions"

// Danh sách thông báo mẫu
const initialNotifications = [
    {
        id: 1,
        title: "Bình luận mới",
        message: "Nguyễn Văn A đã bình luận vào bài viết của bạn: 'Bài viết chia sẻ rất hữu ích!'",
        time: "5 phút trước",
        isRead: false,
        icon: faComment,
        iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-900/40"
    },
    {
        id: 2,
        title: "Lượt thích mới",
        message: "Trần Thị B đã thích bài viết 'Hướng dẫn học ReactJS căn bản'.",
        time: "30 phút trước",
        isRead: false,
        icon: faHeart,
        iconColor: "text-red-500 bg-red-100 dark:bg-red-900/40"
    },
    {
        id: 3,
        title: "Thông báo hệ thống",
        message: "Chào mừng bạn đến với My Blog! Hãy cập nhật thông tin cá nhân của bạn.",
        time: "2 giờ trước",
        isRead: true,
        icon: faBullhorn,
        iconColor: "text-amber-500 bg-amber-100 dark:bg-amber-900/40"
    },
    {
        id: 4,
        title: "Cập nhật tài khoản",
        message: "Thông tin tài khoản của bạn đã được lưu thành công.",
        time: "1 ngày trước",
        isRead: true,
        icon: faBell,
        iconColor: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40"
    }
]

function Notifications() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnNotifications } = state
    const [list, setList] = useState(initialNotifications)

    if (!btnNotifications) return null

    // Hàm đánh dấu 1 thông báo là đã đọc
    const markAsRead = (id) => {
        setList(list.map(item => item.id === id ? { ...item, isRead: true } : item))
    }

    // Hàm đánh dấu tất cả là đã đọc
    const markAllAsRead = () => {
        setList(list.map(item => ({ ...item, isRead: true })))
    }

    const unreadCount = list.filter(item => !item.isRead).length

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleNotificationsAction(false))}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 animate-in slide-in-from-top-2 fade-in duration-200 flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Thông báo</h3>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} mới
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faCheckDouble} />
                                Đọc tất cả
                            </button>
                        )}
                        <button
                            onClick={() => dispatch(action.toggleNotificationsAction(false))}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* --- DANH SÁCH THÔNG BÁO --- */}
                <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
                    {list.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Không có thông báo nào</p>
                    ) : (
                        list.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => markAsRead(item.id)}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                                    item.isRead
                                        ? "bg-white dark:bg-dark-surface border-gray-100 dark:border-gray-800 opacity-75 hover:opacity-100"
                                        : "bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 shadow-sm hover:bg-blue-100/70"
                                }`}
                            >
                                {/* Icon thể loại thông báo */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconColor}`}>
                                    <FontAwesomeIcon icon={item.icon} className="text-base" />
                                </div>

                                {/* Nội dung */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className={`text-sm font-bold truncate ${item.isRead ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                                            {item.title}
                                        </h4>
                                        <span className="text-[11px] text-gray-400 shrink-0">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                        {item.message}
                                    </p>
                                </div>

                                {/* Chấm xanh đánh dấu CHƯA ĐỌC */}
                                {!item.isRead && (
                                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0 mt-1.5 animate-pulse"></span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                        onClick={() => dispatch(action.toggleNotificationsAction(false))}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notifications
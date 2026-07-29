import { useContext, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCakeCandles, faHashtag, faXmark, faUserPen, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFileLines, faComments } from "@fortawesome/free-regular-svg-icons"
import * as action from "../context/Actions"
import Blog_context from "../context/Blog_Context"
import EditForm from "../components/EditForm"
import PostCard from "../components/PostCard"

import useModalBackHandler from "../hooks/useModalBackHandler"

function Info() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnInfo, currentUser, posts = [] } = state
    const [isEditing, setIsEditing] = useState(false)

    // 🔄 Bắt sự kiện nút Back (←) và Forward (→) trình duyệt để đóng/mở Modal
    useModalBackHandler(
        btnInfo,
        () => dispatch(action.toggleInfoAction(false)),
        () => dispatch(action.toggleInfoAction(true))
    )

    if (!btnInfo) return null

    // Danh sách bài viết của User
    const userPosts = posts.filter(p =>
        p.authorEmail ? p.authorEmail === currentUser?.email : p.author === currentUser?.username
    )
    const userPostsCount = userPosts.length

    const joinedDate = currentUser?.createdAt || currentUser?.joinedDate || "Jul 22, 2026"

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 dark:bg-dark-bg animate-in fade-in duration-200">

            {/* Top Black Banner */}
            <div className="h-44 bg-black w-full relative flex items-start justify-end p-4 sm:p-6 border-b border-gray-800">
                <button
                    onClick={() => dispatch(action.toggleInfoAction(false))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Đóng trang hồ sơ"
                >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
            </div>

            {/* Main Profile Area */}
            <div className="w-full max-w-4xl mx-auto px-4 pb-16 -mt-16 relative z-10">

                {/* Profile Card Header */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 pt-16 sm:pt-16 relative text-center shadow-lg">

                    {/* Avatar */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-dark-surface overflow-hidden absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 shadow-md object-cover bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {currentUser?.avatar ? (
                            <img src={currentUser.avatar} alt={currentUser.username} className="w-full h-full object-cover" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-4xl" />
                        )}
                    </div>

                    {/* Edit Profile Button */}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute top-6 right-6 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm px-4 sm:px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faUserPen} className="text-xs hidden sm:inline" />
                        <span>Edit profile</span>
                    </button>

                    {/* Name */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5">
                        {currentUser?.username || "Nguyễn Nhật Minh Quân"}
                    </h1>

                    {/* Bio */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                        {currentUser?.bio || "404 bio not found"}
                    </p>

                    {/* Joined Date */}
                    <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5 font-medium">
                        <FontAwesomeIcon icon={faCakeCandles} className="text-gray-400" />
                        <span>Joined on {joinedDate}</span>
                    </div>

                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
                    {/* Left Box */}
                    <div className="w-full sm:w-72 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-3.5 shadow-sm shrink-0">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <FontAwesomeIcon icon={faFileLines} className="text-gray-400 text-base w-5 text-center" />
                            <span>{userPostsCount} posts published</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <FontAwesomeIcon icon={faComments} className="text-gray-400 text-base w-5 text-center" />
                            <span>0 comments written</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <FontAwesomeIcon icon={faHashtag} className="text-gray-400 text-base w-5 text-center" />
                            <span>6 tags followed</span>
                        </div>
                    </div>
                    {/* Right Box - Danh sách bài viết của tôi */}
                    <div className="flex-1 w-full bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                            Bài viết của tôi ({userPostsCount})
                        </h3>
                        {userPosts.length === 0 ? (
                            <p className="text-center text-gray-500 py-8 text-sm">Bạn chưa xuất bản bài viết nào.</p>
                        ) : (
                            userPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))
                        )}
                    </div>
                </div>


            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <EditForm
                    currentUser={currentUser}
                    dispatch={dispatch}
                    onClose={() => setIsEditing(false)}
                />
            )}

        </div>
    )
}

export default Info
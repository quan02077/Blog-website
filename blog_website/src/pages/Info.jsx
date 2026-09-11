import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCakeCandles, faHashtag, faXmark, faUserPen, faUser, faTrashCan, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { faFileLines, faComments } from "@fortawesome/free-regular-svg-icons"
import * as action from "../context/Actions"
import Blog_context from "../context/Blog_Context"
import EditForm from "../components/EditForm"
import PostCard from "../components/PostCard"
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "../utils/alert"
import { deleteDraft_Post } from '../api/post'

function Info() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnInfo, currentUser, posts = [], selectedAuthor } = state
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    if (!btnInfo) return null

    // xác định xem có phải đang xem tài khoản của chính mình hay của người khác
    const targetAuthorId = selectedAuthor?.authorId || selectedAuthor?.id || selectedAuthor?.userId
    const currentUserId = currentUser?.id || currentUser?.Id

    const isOwner = !selectedAuthor || Boolean(
        (currentUserId && targetAuthorId && String(currentUserId).toLowerCase() === String(targetAuthorId).toLowerCase()) ||
        (currentUser?.username && selectedAuthor?.authorName && String(currentUser.username).toLowerCase() === String(selectedAuthor.authorName).toLowerCase())
    )

    const handleDelete = async (postId) => {
        const result = await showConfirmAlert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa bài viết này không?')
        if (result.isConfirmed) {
            setLoading(true)
            try {
                await deleteDraft_Post(postId)
                dispatch(action.deletePostsAction(postId))
                await showSuccessAlert('Thành công', 'Đã xóa bài viết thành công!')
            } catch (error) {
                await showErrorAlert('Lỗi', error.message)
            } finally {
                setLoading(false)
            }
        }
    }

    // danh sách bài viết của tác giả đang xem
    const userPosts = posts.filter(p => {
        if (isOwner) {
            const isAuthorIdMatch = p.authorId && currentUserId && String(p.authorId).toLowerCase() === String(currentUserId).toLowerCase();
            const isEmailMatch = p.authorEmail && p.authorEmail === currentUser?.email;
            const isNameMatch = (p.authorName || p.author) && String(p.authorName || p.author).toLowerCase() === String(currentUser?.username || '').toLowerCase();
            return isAuthorIdMatch || isEmailMatch || isNameMatch;
        } else {
            const isAuthorIdMatch = targetAuthorId && (
                (p.authorId && String(p.authorId).toLowerCase() === String(targetAuthorId).toLowerCase()) ||
                (p.userId && String(p.userId).toLowerCase() === String(targetAuthorId).toLowerCase())
            );
            const isNameMatch = selectedAuthor?.authorName && (
                (p.authorName || p.author) && String(p.authorName || p.author).toLowerCase() === String(selectedAuthor.authorName).toLowerCase()
            );
            return isAuthorIdMatch || isNameMatch;
        }
    })
    const userPostsCount = userPosts.length

    // thông tin hiển thị (avatar, tên, bio, ngày tham gia)
    const displayName = isOwner
        ? (currentUser?.username || "Tác giả")
        : (selectedAuthor?.authorName || selectedAuthor?.author || "Tác giả")

    const displayAvatar = isOwner
        ? currentUser?.avatar
        : (selectedAuthor?.authorAvatar || selectedAuthor?.avatar)

    const displayBio = isOwner
        ? (currentUser?.bio || "404 bio not found")
        : (selectedAuthor?.authorBio || selectedAuthor?.bio || "404 bio not found")

    const joinedDate = isOwner
        ? (currentUser?.createdAt || currentUser?.joinedDate || "Jul 22, 2026")
        : (selectedAuthor?.date || (selectedAuthor?.createdAt ? new Date(selectedAuthor.createdAt).toLocaleDateString('vi-VN') : "Jul 22, 2026"))

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 dark:bg-dark-bg animate-in fade-in duration-200">

            {/* top black banner */}
            <div className="h-44 bg-black w-full relative flex items-start justify-end p-4 sm:p-6 border-b border-gray-800">
                <button
                    onClick={() => dispatch(action.toggleInfoAction(false))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Đóng trang hồ sơ"
                >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
            </div>

            {/* main profile area */}
            <div className="w-full max-w-4xl mx-auto px-4 pb-16 -mt-16 relative z-10">

                {/* profile card header */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 pt-16 sm:pt-16 relative text-center shadow-lg">

                    {/* avatar */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-dark-surface overflow-hidden absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 shadow-md object-cover bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {displayAvatar ? (
                            <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-4xl" />
                        )}
                    </div>

                    {/* edit profile button (chỉ hiển thị cho chính chủ) */}
                    {isOwner && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-6 right-6 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm px-4 sm:px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faUserPen} className="text-xs hidden sm:inline" />
                            <span>Edit profile</span>
                        </button>
                    )}

                    {/* name */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5">
                        {displayName}
                    </h1>

                    {/* bio */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                        {displayBio}
                    </p>

                    {/* joined date */}
                    <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5 font-medium">
                        <FontAwesomeIcon icon={faCakeCandles} className="text-gray-400" />
                        <span>Joined on {joinedDate}</span>
                    </div>

                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
                    {/* left box */}
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

                    {/* right box - danh sách bài viết */}
                    <div className="flex-1 w-full bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                            {isOwner ? `Bài viết của tôi (${userPostsCount})` : `Bài viết của ${displayName} (${userPostsCount})`}
                        </h3>
                        {userPosts.length === 0 ? (
                            <p className="text-center text-gray-500 py-8 text-sm">
                                {isOwner ? "Bạn chưa xuất bản bài viết nào." : "Tác giả chưa xuất bản bài viết nào."}
                            </p>
                        ) : (
                            userPosts.map(post => (
                                <div key={post.id} className="relative group cursor-pointer" >
                                    <PostCard post={post} />
                                    {isOwner && (
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(post.id)}
                                            disabled={loading}
                                            className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                    Đang xóa...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                    Xóa bài
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* edit profile modal */}
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
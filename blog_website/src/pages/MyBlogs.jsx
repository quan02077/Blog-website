import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faNewspaper, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showConfirmAlert, showSuccessAlert } from '../utils/alert'

function MyBlogs() {
    const [state, dispatch] = useContext(Blog_context)
    const { btnMyPosts, posts, currentUser } = state
    const userPosts = posts.filter(post => post.authorEmail ? post.authorEmail === currentUser?.email : post.author === currentUser?.username);

    if (!btnMyPosts) return null

    const handleDelete = async (postId) => {
        const result = await showConfirmAlert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa bài viết này không?')
        if (result.isConfirmed) {
            dispatch(action.deletePostsAction(postId))
            showSuccessAlert('Thành công', 'Đã xóa bài viết thành công!')
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleMyPostsAction(false))}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-6 animate-in slide-in-from-top-2 fade-in duration-200 flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faNewspaper} className="text-blue-500 text-xl" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bài viết của tôi</h3>
                        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {userPosts.length} bài
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(action.toggleMyPostsAction(false))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                </div>

                {/* --- DANH SÁCH BÀI VIẾT --- */}
                <div className="flex-1 overflow-y-auto my-4 space-y-6 pr-1">
                    {userPosts.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Bạn chưa viết bài nào.</p>
                    ) : (
                        userPosts.map((post) => (
                            <div key={post.id} className="relative group cursor-pointer" >
                                <PostCard post={post} />
                                <button
                                    type="button"
                                    onClick={() => handleDelete(post.id)}
                                    className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    Xóa bài
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                        onClick={() => dispatch(action.toggleMyPostsAction(false))}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyBlogs
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComment,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'

function PostComment({ commentText, setCommentText, commentsList }) {
    const [state] = useContext(Blog_context)
    const { currentUser } = state || {}

    return (
        <section className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    Bình luận ({commentsList.length})
                </h3>
            </div>

            {/* Form gửi bình luận mẫu */}
            <div className="flex gap-3 items-start">
                <img
                    src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.username || 'User'}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 shrink-0 object-cover"
                />
                <div className="flex-1 flex flex-col gap-2">
                    <div className="relative">
                        <textarea
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Viết suy nghĩ của bạn về bài viết này..."
                            className="w-full text-sm bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-2xl p-3.5 pr-8 outline-none focus:border-gray-900 dark:focus:border-gray-700 transition-colors resize-none"
                        />
                        {commentText && (
                            <button
                                type="button"
                                onClick={() => setCommentText('')}
                                className="absolute right-3 top-3 text-gray-400 hover:text-red-500 transition-colors cursor-pointer text-xs"
                                title="Xóa hết"
                            >
                                Xóa
                            </button>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            </div>

            {/* Danh sách các bình luận mẫu */}
            <div className="flex flex-col gap-4 mt-2">
                {commentsList.map((cmt) => (
                    <div key={cmt.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg/60 border border-gray-100 dark:border-gray-800/80 flex gap-3.5">
                        <img
                            src={cmt.avatar}
                            alt={cmt.author}
                            className="w-9 h-9 rounded-full shrink-0"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{cmt.author}</h4>
                                <span className="text-xs text-gray-400">{cmt.date}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {cmt.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default PostComment
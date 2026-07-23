import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import WritePostHeader from '../components/WritePostHeader'
import CoverUpload from '../components/CoverUpload'
import PostMeta from '../components/PostMeta'
import MarkdownEditor from '../components/MarkdownEditor'
import BlogContext from '../context/BlogContext'
import * as action from '../context/Actions'

function WritePost() {
    const [dispatch] = useContext(BlogContext)
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    return (
        <div className="flex flex-col gap-6 pb-10">

            <WritePostHeader />

            <CoverUpload />

            {/* Post Title */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tiêu đề</label>
                <input
                    value={title}
                    type="text"
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full text-2xl font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="flex justify-end mt-1.5">
                    <span className="text-xs text-gray-400">0 / 120 ký tự</span>
                </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Mô tả ngắn</label>
                <textarea
                    value={summary}
                    placeholder="Tóm tắt ngắn về bài viết của bạn..."
                    rows={3}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent resize-none leading-relaxed"
                    onChange={(e) => setSummary(e.target.value)}
                />
                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="flex justify-end mt-1.5">
                    <span className="text-xs text-gray-400">0 / 200 ký tự</span>
                </div>
            </div>

            <PostMeta />

            <MarkdownEditor />

            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-3 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    Lưu nháp
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 py-3 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Đăng bài
                </button>
            </div>

        </div>
    )
}

export default WritePost
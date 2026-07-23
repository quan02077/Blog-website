import { useState } from 'react'
import WritePostHeader from '../components/WritePostHeader'
import CoverUpload from '../components/CoverUpload'
import PostMeta from '../components/PostMeta'
import MarkdownEditor from '../components/MarkdownEditor'
import PreviewModal from '../components/PreviewModal'

function WritePost() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState(null)
    const [newCategory, setNewCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [tag, setTag] = useState('')
    const [content, setContent] = useState('')
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const calculateReadTime = (content) => {
        if (!content || content.trim() === '') return 1;
        const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

        const wordsPerMinute = 200;

        const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        return minutes;
    }

    const postData = {
        title,
        summary,
        image,
        category: isAddingNew ? newCategory : selectedCategory,
        tag,
        content,
        readTime: calculateReadTime(content)
    }

    return (
        <div className="flex flex-col gap-6 pb-10">

            <WritePostHeader postData={postData} onPreview={() => setIsPreviewOpen(true)} />

            <CoverUpload image={image} setImage={setImage} />

            {/* Post Title */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tiêu đề</label>
                <input
                    value={title}
                    type="text"
                    maxLength="120"
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full text-2xl font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="flex justify-end mt-1.5">
                    <span className="text-xs text-gray-400">{title.length}/120 ký tự</span>
                </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Mô tả ngắn</label>
                <textarea
                    value={summary}
                    placeholder="Tóm tắt ngắn về bài viết của bạn..."
                    rows={3}
                    maxLength="200"
                    className="w-full text-sm text-gray-600 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent resize-none leading-relaxed"
                    onChange={(e) => setSummary(e.target.value)}
                />
                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="flex justify-end mt-1.5">
                    <span className="text-xs text-gray-400">{summary.length}/200 ký tự</span>
                </div>
            </div>

            <PostMeta
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isAddingNew={isAddingNew}
                setIsAddingNew={setIsAddingNew}
                tag={tag}
                setTag={setTag}
                readTime={calculateReadTime(content)}
            />

            <MarkdownEditor content={content} setContent={setContent} />

            <PreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                postData={postData}
            />

        </div>
    )
}

export default WritePost
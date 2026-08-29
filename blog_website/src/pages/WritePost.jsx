import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import WritePostHeader from '../components/WritePostHeader'
import CoverUpload from '../components/CoverUpload'
import PostMeta from '../components/PostMeta'
import MarkdownEditor from '../components/MarkdownEditor'
import PreviewModal from '../components/PreviewModal'
import ClearInputButton from '../components/ClearInputButton'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

function WritePostContent({ currentDraft, id }) {
    const [, dispatch] = useContext(Blog_context)
    const isEdit = Boolean(id)

    const [title, setTitle] = useState(currentDraft?.title || '')
    const [summary, setSummary] = useState(currentDraft?.summary || currentDraft?.description || '')
    const [image, setImage] = useState(currentDraft?.coverImage || currentDraft?.image || null)
    const [newCategory, setNewCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(currentDraft?.categoryId || currentDraft?.category || '')
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [tag, setTag] = useState(
        currentDraft?.tag || (Array.isArray(currentDraft?.tags) ? currentDraft.tags.join(', ') : '')
    )
    const [content, setContent] = useState(currentDraft?.content || '')
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    useEffect(() => {
        if (title.trim() !== '' || content.trim() !== '') {
            dispatch(action.isDirtyAction(true))
        } else {
            dispatch(action.isDirtyAction(false))
        }
    }, [title, content]);


    const calculateReadTime = (content) => {
        if (!content || content.trim() === '') return 1;
        const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

        const wordsPerMinute = 200;

        const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        return minutes;
    }

    const postData = {
        id: id ? Number(id) || id : undefined,
        title,
        summary,
        image,
        categoryId: isAddingNew ? undefined : selectedCategory,
        category: isAddingNew ? newCategory : undefined,
        tag,
        content,
        readTime: calculateReadTime(content)
    }

    return (
        <div className="flex flex-col gap-6 pb-10">

            <WritePostHeader postData={postData} onPreview={() => setIsPreviewOpen(true)} isEdit={isEdit} image={image} />

            <CoverUpload image={image} setImage={setImage} />

            {/* Post Title */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tiêu đề</label>
                <div className="relative">
                    <input
                        value={title}
                        type="text"
                        maxLength="120"
                        placeholder="Nhập tiêu đề bài viết..."
                        className="w-full text-2xl font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent pr-8"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <ClearInputButton value={title} onClear={() => setTitle('')} className="right-0" />
                </div>
                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="flex justify-end mt-1.5">
                    <span className="text-xs text-gray-400">{title.length}/120 ký tự</span>
                </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Mô tả ngắn</label>
                    {summary && (
                        <button
                            type="button"
                            onClick={() => setSummary('')}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                            Xóa hết
                        </button>
                    )}
                </div>
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

function WritePost() {
    const { id } = useParams()
    const [state] = useContext(Blog_context)

    const currentDraft = id
        ? state.drafts.find(d => String(d.id) === String(id)) || state.posts.find(p => String(p.id) === String(id))
        : null

    return <WritePostContent key={id || 'new'} currentDraft={currentDraft} id={id} />
}

export default WritePost
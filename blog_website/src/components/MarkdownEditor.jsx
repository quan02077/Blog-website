function MarkdownEditor({ content, setContent }) {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <textarea
                placeholder={"\n## Tiêu đề phần\n\nNhập nội dung ở đây..."}
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-sm text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent resize-none p-6 leading-7 font-mono"
            />
        </div>
    )
}

export default MarkdownEditor

const toolbarItems = ['B', 'I', 'S', '—', 'H1', 'H2', '"', '—', '<>', '⠿', '🔗', '🖼', '—', 'Markdown']

function MarkdownEditor() {
    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-1 overflow-x-auto">
                {toolbarItems.map((item, i) => (
                    item === '—' ? (
                        <div key={i} className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1 shrink-0" />
                    ) : (
                        <button key={i} className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 px-2.5 py-1.5 rounded-lg transition-colors shrink-0">
                            {item}
                        </button>
                    )
                ))}
            </div>

            {/* Textarea */}
            <textarea
                placeholder={"Viết nội dung bài viết bằng Markdown...\n\n## Tiêu đề phần\n\nNhập nội dung ở đây..."}
                rows={20}
                readOnly
                className="w-full text-sm text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none bg-transparent resize-none p-6 leading-7 font-mono"
            />
        </div>
    )
}

export default MarkdownEditor

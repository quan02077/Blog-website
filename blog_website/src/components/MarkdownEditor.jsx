const toolbarItems = ['B', 'I', 'S', '—', 'H1', 'H2', '"', '—', '<>', '⠿', '🔗', '🖼', '—', 'Markdown']

function MarkdownEditor() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-gray-100 px-4 py-3 flex items-center gap-1 overflow-x-auto">
                {toolbarItems.map((item, i) => (
                    item === '—' ? (
                        <div key={i} className="w-px h-5 bg-gray-200 mx-1 shrink-0" />
                    ) : (
                        <button key={i} className="text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors shrink-0">
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
                className="w-full text-sm text-gray-700 placeholder-gray-300 border-none outline-none bg-transparent resize-none p-6 leading-7 font-mono"
            />
        </div>
    )
}

export default MarkdownEditor

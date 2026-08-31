import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTag
} from '@fortawesome/free-solid-svg-icons'
function PostContent({ post }) {
    const rawTags = post?.tag || post?.tags || ''
    const tagsList = Array.isArray(rawTags)
        ? rawTags
        : String(rawTags).split(',').map(t => t.trim()).filter(Boolean)

    return (
        <div className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-sm">
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-base whitespace-pre-line break-words">
                {post?.content}
            </div>

            {/* --- TAGS LIST --- */}
            {tagsList.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1">
                        <FontAwesomeIcon icon={faTag} />
                        Thẻ bài viết:
                    </span>
                    {tagsList.map((t, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full transition-colors cursor-pointer"
                        >
                            #{t}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
export default PostContent
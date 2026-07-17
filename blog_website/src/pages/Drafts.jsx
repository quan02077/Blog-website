import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DraftCard from '../components/DraftCard'
import DraftEmptyState from '../components/DraftEmptyState'

const sampleDrafts = [
    {
        id: 1,
        title: "Deploy React lên Vercel — Hướng dẫn từng bước",
        excerpt: "Hướng dẫn chi tiết cách deploy một ứng dụng React lên Vercel, từ cấu hình đến biến môi trường.",
        image: "https://picsum.photos/seed/vercel-deploy/400/200",
        category: "React",
        tags: ["vercel", "deploy", "react"],
        lastEdited: "14/07/2026 — 20:30",
        readTime: "6 phút",
    },
    {
        id: 2,
        title: "So sánh Vite vs Webpack — Ai nhanh hơn?",
        excerpt: "Phân tích chi tiết sự khác biệt giữa Vite và Webpack về tốc độ build, cấu hình và hệ sinh thái plugin.",
        image: "https://picsum.photos/seed/vite-webpack/400/200",
        category: "JavaScript",
        tags: ["vite", "webpack", "bundler"],
        lastEdited: "13/07/2026 — 15:45",
        readTime: "8 phút",
    },
    {
        id: 3,
        title: "CSS Grid vs Flexbox — Khi nào dùng cái nào?",
        excerpt: "Hướng dẫn toàn diện về hai layout system mạnh mẽ nhất của CSS và khi nào nên chọn cái nào.",
        image: "https://picsum.photos/seed/css-grid/400/200",
        category: "CSS",
        tags: ["css", "grid", "flexbox"],
        lastEdited: "12/07/2026 — 09:10",
        readTime: "5 phút",
    },
]

function Drafts() {
    const isEmpty = sampleDrafts.length === 0

    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon icon={faFileLines} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">Bản nháp</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{sampleDrafts.length} bài chưa được đăng</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-48">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bản nháp..."
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder-gray-300 dark:placeholder-gray-600"
                    />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-[#0f1117] cursor-pointer">
                        <option>Tất cả chuyên mục</option>
                        <option>React</option>
                        <option>JavaScript</option>
                        <option>CSS</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-[#0f1117] cursor-pointer">
                        <option>Chỉnh sửa gần nhất</option>
                        <option>Cũ nhất</option>
                        <option>A → Z</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
            </div>

            {/* Draft List or Empty State */}
            {isEmpty ? (
                <DraftEmptyState />
            ) : (
                <div className="flex flex-col gap-4">
                    {sampleDrafts.map((draft) => (
                        <DraftCard key={draft.id} draft={draft} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Drafts
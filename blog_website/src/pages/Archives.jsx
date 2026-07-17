import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ArchiveMonthCard from '../components/ArchiveMonthCard'

const archiveStats = [
    { label: "Tổng bài viết", value: "47" },
    { label: "Năm viết", value: "3" },
    { label: "Chuyên mục", value: "8" },
    { label: "Lượt đọc", value: "12K" },
]

const archiveData = [
    {
        year: 2026,
        months: [
            {
                month: "Tháng 7",
                posts: [
                    { id: 1, title: "Hướng dẫn React Router v6 cho người mới bắt đầu", date: "14/07", readTime: "5 phút", category: "React", image: "https://picsum.photos/seed/react-router/80/80" },
                    { id: 2, title: "Tailwind CSS v4 — Những tính năng mới đáng chú ý", date: "12/07", readTime: "8 phút", category: "CSS", image: "https://picsum.photos/seed/tailwind-v4/80/80" },
                    { id: 3, title: "10 mẹo JavaScript giúp code sạch hơn", date: "10/07", readTime: "6 phút", category: "JavaScript", image: "https://picsum.photos/seed/js-tips/80/80" },
                ],
            },
            {
                month: "Tháng 6",
                posts: [
                    { id: 4, title: "TypeScript Generics từ cơ bản đến nâng cao", date: "28/06", readTime: "10 phút", category: "TypeScript", image: "https://picsum.photos/seed/typescript/80/80" },
                    { id: 5, title: "Tối ưu hiệu năng Next.js với Server Components", date: "15/06", readTime: "7 phút", category: "Next.js", image: "https://picsum.photos/seed/nextjs/80/80" },
                ],
            },
        ],
    },
    {
        year: 2025,
        months: [
            {
                month: "Tháng 12",
                posts: [
                    { id: 6, title: "Giới thiệu React 19 — Những thay đổi đáng mong đợi", date: "20/12", readTime: "9 phút", category: "React", image: "https://picsum.photos/seed/react19/80/80" },
                ],
            },
        ],
    },
]

function Archives() {
    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faArchive} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">Lưu trữ</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toàn bộ bài viết được sắp xếp theo thời gian</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {archiveStats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center hover:shadow-md transition-shadow">
                        <p className="text-2xl font-black text-blue-500 dark:text-blue-400 mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-48">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder-gray-300 dark:placeholder-gray-600"
                    />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer">
                        <option>Tất cả năm</option>
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
                <div className="relative">
                    <select className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer">
                        <option>Tất cả tháng</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i}>Tháng {i + 1}</option>
                        ))}
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
            </div>

            {/* Timeline */}
            {archiveData.map((yearBlock) => (
                <div key={yearBlock.year} className="flex flex-col gap-4">
                    {/* Year Heading */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">{yearBlock.year}</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                    </div>

                    {yearBlock.months.map((monthBlock) => (
                        <ArchiveMonthCard key={monthBlock.month} monthBlock={monthBlock} />
                    ))}
                </div>
            ))}

        </div>
    )
}

export default Archives

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons"
import { FeaturedPopularPost, CompactPopularPost } from '../components/Popular'

const popularPosts = [
    {
        id: 1,
        rank: 1,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "14 Tháng 7, 2026",
        category: "React",
        title: "Hướng dẫn React Router v6 cho người mới bắt đầu",
        description: "Tìm hiểu cách sử dụng React Router v6 để xây dựng ứng dụng Single Page Application với hệ thống điều hướng mạnh mẽ và linh hoạt.",
        image: "https://picsum.photos/seed/react-router/800/400",
        likes: 342,
        comments: 56,
        readTime: "5 phút đọc",
    },
    {
        id: 2,
        rank: 2,
        author: "Dev Tuấn",
        avatar: "https://ui-avatars.com/api/?name=Dev+Tuan&background=ef4444&color=fff&size=128",
        date: "12 Tháng 7, 2026",
        category: "CSS",
        title: "Tailwind CSS v4 — Những tính năng mới đáng chú ý",
        description: "Khám phá những thay đổi lớn trong Tailwind CSS v4 bao gồm @theme, CSS-first configuration.",
        image: "https://picsum.photos/seed/tailwind-v4/800/400",
        likes: 285,
        comments: 42,
        readTime: "8 phút đọc",
    },
    {
        id: 3,
        rank: 3,
        author: "CSS Lover",
        avatar: "https://ui-avatars.com/api/?name=CSS+Lover&background=10b981&color=fff&size=128",
        date: "10 Tháng 7, 2026",
        category: "JavaScript",
        title: "10 mẹo JavaScript giúp code sạch hơn mỗi ngày",
        description: "Tổng hợp 10 kỹ thuật và mẹo viết JavaScript hiện đại giúp code của bạn ngắn gọn, dễ đọc hơn.",
        image: "https://picsum.photos/seed/js-tips/800/400",
        likes: 215,
        comments: 34,
        readTime: "6 phút đọc",
    },
    {
        id: 4,
        rank: 4,
        author: "JS Dev",
        avatar: "https://ui-avatars.com/api/?name=JS+Dev&background=8b5cf6&color=fff&size=128",
        date: "9 Tháng 7, 2026",
        category: "TypeScript",
        title: "TypeScript Generics từ cơ bản đến nâng cao",
        description: "Hướng dẫn toàn diện về Generics trong TypeScript, cách sử dụng và các patterns phổ biến.",
        image: "https://picsum.photos/seed/typescript/800/400",
        likes: 189,
        comments: 28,
        readTime: "10 phút đọc",
    },
    {
        id: 5,
        rank: 5,
        author: "FrontEnd Pro",
        avatar: "https://ui-avatars.com/api/?name=Front+End&background=f59e0b&color=fff&size=128",
        date: "8 Tháng 7, 2026",
        category: "Next.js",
        title: "Tối ưu hiệu năng Next.js với Server Components",
        description: "Làm thế nào để tận dụng tối đa sức mạnh của React Server Components trong Next.js 14.",
        image: "https://picsum.photos/seed/nextjs/800/400",
        likes: 156,
        comments: 19,
        readTime: "7 phút đọc",
    },
]

function PopularPosts() {
    const [featured, ...rest] = popularPosts

    return (
        <div className="flex flex-col gap-6 pb-8">
            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">Phổ biến</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Những bài viết được đọc và tương tác nhiều nhất tuần qua.</p>
                </div>
            </div>

            {/* Layout 5 implementation - Page scale */}
            <div className="flex flex-col gap-6">

                {/* Featured Post (Rank 1) */}
                <FeaturedPopularPost post={featured} />

                {/* Compact List (Rank 2-5) */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-2 sm:p-4">
                    {rest.map((post, index) => (
                        <div key={post.id} className="relative">
                            <CompactPopularPost post={post} />

                            {/* Divider */}
                            {index < rest.length - 1 && (
                                <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4 sm:mx-20" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default PopularPosts

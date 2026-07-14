import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'

const samplePosts = [
    {
        id: 1,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "14 Tháng 7, 2026",
        category: "React",
        title: "Hướng dẫn React Router v6 cho người mới bắt đầu",
        description: "Tìm hiểu cách sử dụng React Router v6 để xây dựng ứng dụng Single Page Application với hệ thống điều hướng mạnh mẽ và linh hoạt.",
        image: "https://picsum.photos/seed/react-router/800/400",
        likes: 42,
        comments: 12,
        readTime: "5 phút đọc",
    },
    {
        id: 2,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "12 Tháng 7, 2026",
        category: "CSS",
        title: "Tailwind CSS v4 — Những tính năng mới đáng chú ý",
        description: "Khám phá những thay đổi lớn trong Tailwind CSS v4 bao gồm @theme, CSS-first configuration và hiệu suất build nhanh hơn gấp 10 lần.",
        image: "https://picsum.photos/seed/tailwind-v4/800/400",
        likes: 85,
        comments: 23,
        readTime: "8 phút đọc",
    },
    {
        id: 3,
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=3b82f6&color=fff&size=128",
        date: "10 Tháng 7, 2026",
        category: "JavaScript",
        title: "10 mẹo JavaScript giúp code sạch hơn",
        description: "Tổng hợp 10 kỹ thuật và mẹo viết JavaScript hiện đại giúp code của bạn ngắn gọn, dễ đọc và hiệu quả hơn.",
        image: "https://picsum.photos/seed/js-tips/800/400",
        likes: 128,
        comments: 34,
        readTime: "6 phút đọc",
    },
]

function PostCard({ post }) {
    return (
        <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Post Image */}
            <div className="relative overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                </span>
            </div>

            {/* Post Body */}
            <div className="p-5">
                {/* Author & Date */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{post.author}</span>
                        <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
                    </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {post.description}
                </p>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-sm">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors text-sm">
                            <FontAwesomeIcon icon={faComment} />
                            <span>{post.comments}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                        <button className="text-gray-400 hover:text-green-500 transition-colors">
                            <FontAwesomeIcon icon={faShareFromSquare} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

function Posts() {
    return (
        <div className="flex flex-col gap-6">
            {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts
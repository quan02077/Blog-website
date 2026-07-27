import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faHeart,
    faBookmark,
    faShareNodes,
    faComment,
    faPaperPlane,
    faClock,
    faCalendar,
    faUserCheck,
    faTag
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'

function PostDetail() {
    // 💡 Dữ liệu mẫu (Template Data) thuần giao diện
    const post = {
        title: "Xây dựng ứng dụng Web hiện đại với React, Vite và Tailwind CSS",
        summary: "Hướng dẫn chi tiết từ A-Z cách tối ưu cấu trúc dự án, tạo Design System với Tailwind CSS và kết hợp Context API quản lý state hiệu quả.",
        category: "ReactJS",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
        author: "Minh Quân",
        avatar: "https://ui-avatars.com/api/?name=Minh+Quan&background=0D8ABC&color=fff",
        date: "25/07/2026",
        readTime: "5 phút đọc",
        likes: 42,
        tags: ["React", "TailwindCSS", "Frontend", "JavaScript"],
        content: `
# 🚀 Giới thiệu

Trong kỷ nguyên phát triển ứng dụng Web ngày nay, việc tối ưu hóa tốc độ tải trang và nâng cao trải nghiệm người dùng (**User Experience**) là ưu tiên hàng đầu của mọi Lập trình viên Frontend.

Sự kết hợp giữa **Vite**, **ReactJS** và **Tailwind CSS** mang lại tốc độ biên dịch cực nhanh cùng sự linh hoạt tuyệt đối khi xây dựng UI.

---

### 🎨 1. Thiết lập Design System với Tailwind CSS

Việc thiết lập các **Design Tokens** đồng bộ giúp ứng dụng của bạn duy trì giao diện nhất quán:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6',
        darkSurface: '#1E293B',
      }
    }
  }
}
\`\`\`

---

### 💡 2. Quản lý State với Context API & Reducer

Thay vì phụ thuộc vào các thư viện phức tạp, **React Context API** kết hợp \`useReducer\` giúp bạn kiểm soát Luồng dữ liệu (**Data Flow**) một cách mạch lạc và tường minh.

> "A great UI is not just how it looks, but how effortlessly it works for the user." — UI Principle

#### Kết luận

Hãy bắt đầu tối ưu dự án của bạn ngay hôm nay bằng cách áp dụng các Best Practices về Component hoá và tối ưu render!
        `
    }

    // State mẫu giao diện thuần túy
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [commentsList] = useState([
        {
            id: 1,
            author: "Hoàng Nam",
            avatar: "https://ui-avatars.com/api/?name=Hoang+Nam&background=6366F1&color=fff",
            date: "Vừa xong",
            content: "Bài viết rất chi tiết và dễ hiểu! Mong tác giả ra thêm nhiều bài viết chất lượng về React nữa."
        },
        {
            id: 2,
            author: "Thanh Hằng",
            avatar: "https://ui-avatars.com/api/?name=Thanh+Hang&background=EC4899&color=fff",
            date: "2 giờ trước",
            content: "Phần giải thích về Context API rất trực quan. Cảm ơn bạn nhé!"
        }
    ])

    return (
        <article className="flex flex-col gap-8 pb-16 max-w-4xl mx-auto">

            {/* --- TOP TOOLBAR / NAVIGATION --- */}
            <div className="flex items-center justify-between bg-white dark:bg-dark-surface p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-4 z-20 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
                <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Quay lại
                </button>

                <div className="flex items-center gap-3">
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
                        <FontAwesomeIcon icon={faClock} />
                        {post.readTime}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                            isLiked
                                ? 'bg-red-50 dark:bg-red-900/30 text-red-500'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-500'
                        }`}
                    >
                        <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} className={isLiked ? 'text-red-500' : ''} />
                        <span>{isLiked ? post.likes + 1 : post.likes}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                            isBookmarked
                                ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-yellow-500'
                        }`}
                    >
                        <FontAwesomeIcon icon={isBookmarked ? faBookmark : faBookmarkRegular} />
                    </button>

                    <button
                        type="button"
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faShareNodes} />
                    </button>
                </div>
            </div>

            {/* --- HEADER TIÊU ĐỀ & TÁC GIẢ --- */}
            <header className="flex flex-col gap-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {post.title}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal italic border-l-4 border-blue-500 pl-4 py-1">
                    {post.summary}
                </p>

                {/* Thẻ Thông tin Tác giả */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3.5">
                        <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-12 h-12 rounded-full ring-2 ring-blue-500/30 object-cover"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                                <span className="text-blue-500 text-xs">
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                                <span><FontAwesomeIcon icon={faCalendar} className="mr-1" />{post.date}</span>
                                <span>•</span>
                                <span><FontAwesomeIcon icon={faClock} className="mr-1" />{post.readTime}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- HERO COVER IMAGE --- */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-[450px] object-cover"
                />
            </div>

            {/* --- NỘI DUNG BÀI VIẾT --- */}
            <div className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-sm">
                <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-base whitespace-pre-line">
                    {post.content}
                </div>

                {/* --- TAGS LIST --- */}
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1">
                        <FontAwesomeIcon icon={faTag} />
                        Thẻ bài viết:
                    </span>
                    {post.tags.map((t, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full transition-colors cursor-pointer"
                        >
                            #{t}
                        </span>
                    ))}
                </div>
            </div>

            {/* --- KHU VỰC BÌNH LUẬN (COMMENTS SECTION) --- */}
            <section className="bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faComment} className="text-blue-500" />
                        Bình luận ({commentsList.length})
                    </h3>
                </div>

                {/* Form gửi bình luận mẫu */}
                <div className="flex gap-3 items-start">
                    <img
                        src="https://ui-avatars.com/api/?name=User"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Viết suy nghĩ của bạn về bài viết này..."
                            className="w-full text-sm bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-2xl p-3.5 outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                                Gửi bình luận
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danh sách các bình luận mẫu */}
                <div className="flex flex-col gap-4 mt-2">
                    {commentsList.map((cmt) => (
                        <div key={cmt.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg/60 border border-gray-100 dark:border-gray-800/80 flex gap-3.5">
                            <img
                                src={cmt.avatar}
                                alt={cmt.author}
                                className="w-9 h-9 rounded-full shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{cmt.author}</h4>
                                    <span className="text-xs text-gray-400">{cmt.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {cmt.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </article>
    )
}

export default PostDetail

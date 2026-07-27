import { useState } from 'react'
import ToolBarPostDetail from '../components/ToolBarPostDetail'
import HeaderTitlePost from '../components/HeaderTitlePost'
import PostContent from '../components/PostContent'
import PostComment from '../components/PostComment'

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

            <ToolBarPostDetail
                post={post}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
            />

            <HeaderTitlePost post={post} />

            <PostContent post={post} />

            <PostComment
                commentsList={commentsList}
                commentText={commentText}
                setCommentText={setCommentText}
            />

        </article>
    )
}

export default PostDetail

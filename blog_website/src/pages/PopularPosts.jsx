import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Popular from '../components/Popular'

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

function PopularPosts() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faArrowUp} />Popular Posts</h2>
            <div className='grid grid-cols-2'>
                {
                    samplePosts.map((post) => (
                        <Popular key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}
export default PopularPosts

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import PostCard from '../components/PostCard'

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

function Posts() {
    return (
        <div className="flex flex-col gap-6">
            <Link to="/write" className='bg-white rounded-2xl border border-gray-200 p-6 block'>
                <div className='flex gap-4 border-b border-gray-200 p-3 transition-colors hover:border-black duration-200 cursor-text'>
                    <img src="src/assets/mugshot.png" alt="avatar_account" className='w-10 h-10 rounded-full' />
                    <span className='flex-1 text-gray-400 leading-10'>Write something...</span>
                    <FontAwesomeIcon icon={faPenToSquare} className='mt-4' />
                </div>
            </Link>
            {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts
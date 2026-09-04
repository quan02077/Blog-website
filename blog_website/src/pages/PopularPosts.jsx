import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CompactPopularPost } from '../components/Popular'
import { getPopularPost } from '../api/post'

function PopularPosts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const handleGoDetail = (id) => {
        if (id) {
            navigate(`/post/${id}`)
        }
    }

    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);
            try {
                const data = await getPopularPost();

                // Đồng bộ cấu trúc DTO từ C# Backend sang các thuộc tính giao diện yêu cầu
                const mappedData = data.map((item, index) => ({
                    ...item,
                    rank: index + 1, // Thứ hạng tự động theo vị trí mảng
                    category: item.categoryName || item.category,
                    description: item.summary || item.description,
                    author: item.authorName || item.author,
                    avatar: item.authorAvatar || item.avatar || `https://ui-avatars.com/api/?name=${item.authorName || 'User'}`,
                    date: item.createdAt
                        ? new Date(item.createdAt.endsWith('Z') || item.createdAt.includes('+') ? item.createdAt : item.createdAt + 'Z').toLocaleDateString('vi-VN')
                        : (item.date || 'Mới đây'),
                    likes: item.likesCount ?? item.likes ?? 0,
                    comments: item.commentsCount ?? item.comments ?? 0
                }));

                setPosts(mappedData);
            } catch (error) {
                console.error("Lỗi khi tải bài viết phổ biến:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopular();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Đang tải danh sách bài viết phổ biến...
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800">
                Chưa có bài viết phổ biến nào được đăng.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-8">
            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">Phổ biến</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Những bài viết được đọc và tương tác nhiều nhất tuần qua.</p>
                </div>
            </div>

            {/* Danh sách bài viết tối giản */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-2 sm:p-4">
                {posts.map((post, index) => (
                    <div key={post.id} className="relative">
                        <CompactPopularPost post={post} handleGoDetail={() => handleGoDetail(post.id)} />

                        {/* Divider */}
                        {index < posts.length - 1 && (
                            <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4 sm:mx-20" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularPosts

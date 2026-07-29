import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Loader from '../animation/Loader'
function Posts() {
    const [state] = useContext(Blog_context)
    const { currentUser, posts = [] } = state || {}
    const { category, tag } = useParams()
    // Số lượng bài viết hiển thị ban đầu
    const [visibleCount, setVisibleCount] = useState(3)
    const safePosts = posts || []
    const displayPosts = category
        ? safePosts.filter(p => p.category?.toLowerCase() === category.toLowerCase())
        : tag
            ? safePosts.filter(p =>
                (p.tag || '').toLowerCase().includes(tag.toLowerCase()) ||
                (p.category || '').toLowerCase() === tag.toLowerCase()
            )
            : safePosts
    const hasMore = visibleCount < displayPosts.length
    const handleLoadMore = () => {
        // Tải thêm 3 bài viết mỗi lần cuộn xuống đáy
        setVisibleCount(prev => prev + 3)
    }
    const observerRef = useInfiniteScroll(handleLoadMore, hasMore)
    return (
        <div className="flex flex-col gap-6">
            {currentUser && (
                <Link to="/write" className='bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 block'>
                    <div className='flex gap-4 border-b border-gray-200 dark:border-gray-800 p-3 transition-colors hover:border-black dark:hover:border-white duration-200 cursor-text'>
                        <img src={currentUser.avatar} alt="avatar_account" className='w-10 h-10 rounded-full' />
                        <span className='flex-1 text-gray-400 leading-10'>Write something...</span>
                        <FontAwesomeIcon icon={faPenToSquare} className='mt-4' />
                    </div>
                </Link>
            )}
            {category && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        Đang xem chuyên mục: <strong className="uppercase">{category}</strong> ({displayPosts.length} bài viết)
                    </span>
                    <Link to="/posts" className="text-xs font-bold text-blue-600 hover:underline">
                        Xem tất cả
                    </Link>
                </div>
            )}
            {tag && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        Đang xem thẻ: <strong className="uppercase">{tag}</strong> ({displayPosts.length} bài viết)
                    </span>
                    <Link to="/posts" className="text-xs font-bold text-blue-600 hover:underline">
                        Xem tất cả
                    </Link>
                </div>
            )}
            {displayPosts.length === 0 ? (
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 text-center text-gray-500">
                    Chưa có bài viết nào phù hợp.
                </div>
            ) : (
                <>
                    {
                        displayPosts.slice(0, visibleCount).map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    }
                    {/* Vùng cảm biến cuộn trang Infinite Scroll */}
                    <div ref={observerRef} className="py-6 flex flex-col items-center justify-center gap-2">
                        {hasMore ? (
                            <Loader />
                        ) : (
                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                ✨ Bạn đã xem hết danh sách bài viết.
                            </p>
                        )}
                    </div>
                </>
            )
            }
        </div >
    )
}
export default Posts
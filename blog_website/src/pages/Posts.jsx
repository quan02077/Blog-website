import { useContext, useState, useMemo, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Loader from '../animation/Loader'

// Sub-component hiển thị Banner lọc bài viết (Áp dụng nguyên lý DRY - Don't Repeat Yourself)
function FilterBanner({ title, type, count }) {
    return (
        <div className="info-badge">
            <span className="text-sm font-semibold text-gray-800 dark:text-blue-300">
                Đang xem {type}: <strong className="uppercase">{title}</strong> ({count} bài viết)
            </span>
            <Link to="/posts" className="text-xs font-bold text-gray-700 dark:text-blue-400 hover:underline">
                Xem tất cả
            </Link>
        </div>
    )
}

function Posts() {
    const [state] = useContext(Blog_context)
    const { currentUser, posts = [] } = state || {}
    const { category, tag } = useParams()

    // Số lượng bài viết hiển thị ban đầu
    const [visibleCount, setVisibleCount] = useState(2)

    // 1. Tối ưu phép lọc bài viết bằng useMemo (Tránh lọc lại mảng khi chỉ đổi số bài đang xem)
    const displayPosts = useMemo(() => {
        const safePosts = posts || []

        if (category) {
            return safePosts.filter(p => (p.categoryName || p.category || '').toLowerCase() === category.toLowerCase())
        }

        if (tag) {
            return safePosts.filter(p =>
                (p.tag || '').toLowerCase().includes(tag.toLowerCase()) ||
                (p.categoryName || p.category || '').toLowerCase() === tag.toLowerCase()
            )
        }

        return safePosts
    }, [posts, category, tag])

    const hasMore = visibleCount < displayPosts.length

    // 2. Cố định tham chiếu hàm bằng useCallback (Tránh re-create function instance)
    const handleLoadMore = useCallback(() => {
        setVisibleCount(prev => prev + 2)
    }, [])

    // 3. Sử dụng custom hook Infinite Scroll đã tối ưu
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

            {/* Render Banner bằng Component tái sử dụng (DRY) */}
            {category && <FilterBanner type="chuyên mục" title={category} count={displayPosts.length} />}
            {tag && <FilterBanner type="thẻ" title={tag} count={displayPosts.length} />}

            {displayPosts.length === 0 ? (
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 text-center text-gray-500">
                    Chưa có bài viết nào phù hợp.
                </div>
            ) : (
                <>
                    {displayPosts.slice(0, visibleCount).map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}

                    {/* Vùng cảm biến cuộn trang Infinite Scroll */}
                    <div ref={observerRef} className="py-6 flex flex-col items-center justify-center gap-2">
                        {hasMore ? (
                            <Loader />
                        ) : (
                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                Bạn đã xem hết danh sách bài viết.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Posts
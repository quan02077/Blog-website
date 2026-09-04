import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ToolBarPostDetail from '../components/ToolBarPostDetail'
import HeaderTitlePost from '../components/HeaderTitlePost'
import PostContent from '../components/PostContent'
import PostComment from '../components/PostComment'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showSuccessAlert, showErrorAlert } from '../utils/alert'
import { getPostByID, toggleBookmarkPost } from '../api/post'

function PostDetail() {
    const [state, dispatch] = useContext(Blog_context)
    const { bookmarks } = state
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
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

    useEffect(() => {
        const fetchPostDetail = async () => {
            setLoading(true);
            try {
                const data = await getPostByID(id);
                setPost(data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetail();
    }, [id]);

    const isBookmarked = bookmarks?.some(b => String(b.id) === String(post?.id))

    const handleBookmark = async () => {
        if (!post) return
        try {
            await toggleBookmarkPost(post.id);
            dispatch(action.bookmarksAction(post));
            if (isBookmarked) {
                showSuccessAlert('Thông báo', 'Đã bỏ lưu bài viết!')
            } else {
                showSuccessAlert('Thông báo', 'Lưu bài viết thành công!')
            }
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        }
    }

    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareData = {
            title: post?.title,
            text: post?.summary,
            url: shareUrl,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.error('Lỗi khi chia sẻ:', e);
                }
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            showSuccessAlert('Đã sao chép liên kết!', 'Bạn có thể dán link để chia sẻ cho bạn bè.');
        } catch (error) {
            console.error('Lỗi khi sao chép:', error);
            showErrorAlert('Thất bại', 'Không thể sao chép liên kết.');
        }
    }

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Đang tải chi tiết bài viết...
            </div>
        )
    }

    if (!post) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Bài viết không tồn tại hoặc đã bị xóa.
            </div>
        )
    }

    return (
        <article className="flex flex-col gap-8 pb-16 max-w-4xl mx-auto">

            <ToolBarPostDetail
                post={post}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                isBookmarked={isBookmarked}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
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

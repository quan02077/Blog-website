import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ToolBarPostDetail from '../components/ToolBarPostDetail'
import HeaderTitlePost from '../components/HeaderTitlePost'
import PostContent from '../components/PostContent'
import PostComment from '../components/PostComment'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'
import { showSuccessAlert, showErrorAlert } from '../utils/alert'
import { getPostByID, toggleBookmarkPost, toggleLikePost, getCommentsByPost, createComment } from '../api/post';

function PostDetail() {
    const [state, dispatch] = useContext(Blog_context)
    const { bookmarks, currentUser } = state
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [commentsList, setCommentsList] = useState([])

    useEffect(() => {
        const fetchPostDetail = async () => {
            setLoading(true);
            try {
                const data = await getPostByID(id);
                setPost(data);
                setIsLiked(data.isLiked || false);

                const comments = await getCommentsByPost(id);
                setCommentsList(comments || []);

            } catch (error) {
                console.error("Lỗi khi tải chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetail();
    }, [id]);

    const handleAddComment = async () => {
        if (!currentUser) {
            showErrorAlert('Lỗi', 'Bạn cần đăng nhập để bình luận bài viết!');
            return;
        }
        if (!commentText.trim()) return;
        try {
            const newComment = await createComment(post.id, commentText.trim());
            setCommentsList(prev => [newComment, ...prev]);
            setCommentText('');
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        }
    };


    const handleLike = async () => {
        if (!currentUser) {
            showErrorAlert('Lỗi', 'Bạn cần đăng nhập để thực hiện thao tác!');
            return;
        }
        if (!post) return;
        try {
            const data = await toggleLikePost(post.id);
            setIsLiked(data.isLiked);
            setPost(prev => ({ ...prev, likesCount: data.likeCount }));
            dispatch(action.updatePostLikeAction({ id: post.id, likesCount: data.likeCount }));
        } catch (error) {
            showErrorAlert('Lỗi', error.message);
        }
    };


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
                isBookmarked={isBookmarked}
                handleLike={handleLike}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
            />

            <HeaderTitlePost post={post} />

            <PostContent post={post} />

            <PostComment
                commentsList={commentsList}
                commentText={commentText}
                setCommentText={setCommentText}
                handleAddComment={handleAddComment}
            />

        </article>
    )
}

export default PostDetail

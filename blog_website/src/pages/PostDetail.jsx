import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ToolBarPostDetail from '../components/ToolBarPostDetail'
import HeaderTitlePost from '../components/HeaderTitlePost'
import PostContent from '../components/PostContent'
import PostComment from '../components/PostComment'
import Blog_context from '../context/Blog_Context'

function PostDetail() {
    const [state] = useContext(Blog_context)
    const { posts } = state
    const { id } = useParams()
    const post = posts.find((p) => String(p.id) === String(id))

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

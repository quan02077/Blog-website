import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import PostCard from '../components/PostCard'
import Blog_context from '../context/Blog_Context'

function Posts() {
    const [state] = useContext(Blog_context)
    const { currentUser, posts } = state

    return (
        <div className="flex flex-col gap-6">
            <Link to="/write" className='bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 block'>
                <div className='flex gap-4 border-b border-gray-200 dark:border-gray-800 p-3 transition-colors hover:border-black dark:hover:border-white duration-200 cursor-text'>
                    <img src={currentUser.avatar} alt="avatar_account" className='w-10 h-10 rounded-full' />
                    <span className='flex-1 text-gray-400 leading-10'>Write something...</span>
                    <FontAwesomeIcon icon={faPenToSquare} className='mt-4' />
                </div>
            </Link>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts
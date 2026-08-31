import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import useDirtyCheck from "../hooks/useDirtyCheck"

function Trending({ trendingTags }) {
    const navigate = useNavigate()
    const confirmNavigation = useDirtyCheck()

    const handleGoPosts = (tag) => {
        if (tag) {
            confirmNavigation(() => navigate(`/posts/tag/${tag}`))
        }
    }
    return (
        <div className='custom-scrollbar'>
            <div className='bg-white dark:bg-dark-surface rounded-3xl p-4 border border-transparent dark:border-gray-800'>
                <h3 className='font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                    <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                    Trending Posts
                </h3>
                <hr className='border-gray-200 dark:border-gray-800 mt-2' />
                <div className='flex flex-wrap gap-4 mt-2'>
                    {trendingTags?.map((tag, index) => (
                        <div key={index} onClick={() => handleGoPosts(tag.name)} className='flex items-center gap-2 hover:cursor-pointer hover:-translate-y-1.5 duration-200 hover:transition-all text-gray-900 dark:text-gray-300'>
                            <span className='font-bold'>#{index + 1}</span>
                            <span className='text-sm text-gray-600 dark:text-gray-400'>{tag.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trending
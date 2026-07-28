import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons"
import { FeaturedPopularPost, CompactPopularPost } from '../components/Popular'
import { popularPosts } from '../data/popularPosts'

function PopularPosts() {
    const [featured, ...rest] = popularPosts
    const navigate = useNavigate()

    const handleGoDetail = (id) => {
        if (id) {
            navigate(`/post/${id}`)
        }
    }

    return (
        <div className="flex flex-col gap-6 pb-8">
            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">Phổ biến</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Những bài viết được đọc và tương tác nhiều nhất tuần qua.</p>
                </div>
            </div>

            {/* Layout 5 implementation - Page scale */}
            <div className="flex flex-col gap-6">

                {/* Featured Post (Rank 1) */}
                <FeaturedPopularPost post={featured} handleGoDetail={() => handleGoDetail(featured.id)} />

                {/* Compact List (Rank 2-5) */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-2 sm:p-4">
                    {rest.map((post, index) => (
                        <div key={post.id} className="relative">
                            <CompactPopularPost post={post} handleGoDetail={() => handleGoDetail(post.id)} />

                            {/* Divider */}
                            {index < rest.length - 1 && (
                                <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4 sm:mx-20" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default PopularPosts

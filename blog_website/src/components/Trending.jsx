import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faComments, faTrophy } from '@fortawesome/free-solid-svg-icons'

const trendingTags = [
    { name: "ReactJS" },
    { name: "JavaScript" },
    { name: "TailwindCSS" },
    { name: "NodeJS" },
    { name: "TypeScript" },
    { name: "NextJS" },
]

const hotDiscussions = [
    {
        title: "React 19 có thực sự cần thiết?",
        comments: 89,
        author: "DevTuan",
    },
    {
        title: "Tailwind vs CSS thuần — Bạn chọn cái nào?",
        comments: 156,
        author: "CSSLover",
    },
    {
        title: "Lộ trình học Frontend 2026",
        comments: 67,
        author: "MinhQuân",
    },
    {
        title: "Nên học Vue hay React trước?",
        comments: 203,
        author: "JSDev",
    },
]

const topCreators = [
    { name: "Minh Quân", avatar: "https://ui-avatars.com/api/?name=MQ&background=3b82f6&color=fff&size=64", followers: "2.1k" },
    { name: "Dev Tuấn", avatar: "https://ui-avatars.com/api/?name=DT&background=ef4444&color=fff&size=64", followers: "1.8k" },
    { name: "CSS Lover", avatar: "https://ui-avatars.com/api/?name=CL&background=10b981&color=fff&size=64", followers: "1.5k" },
]

function Trending() {
    return (
        <div className='custom-scrollbar group'>
            <div className='bg-white rounded-3xl p-4'>
                <h3 className='font-bold text-gray-800 flex items-center gap-2'>
                    <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                    Trending Posts
                </h3>
                <hr className='border-gray-200 mt-2' />
                <div className='flex flex-wrap gap-4 mt-2'>
                    {trendingTags.map((tag, index) => (
                        <div key={index} className='flex items-center gap-2 hover:cursor-pointer hover:-translate-y-1.5 duration-200 hover:transition-all'>
                            <span className='font-bold'>#{index + 1}</span>
                            <span className='text-sm text-gray-600'>{tag.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-white rounded-3xl p-4 mt-5'>
                <h3 className='font-bold text-gray-800 flex items-center gap-2'>
                    <FontAwesomeIcon icon={faComments} className="text-blue-500" />
                    Hot Discussions
                </h3>
                <hr className='border-gray-200 mt-2' />
                <div className='flex flex-col gap-2 mt-2'>
                    {hotDiscussions.map((discussion, index) => (
                        <>
                            <div key={index} className='flex flex-col p-4 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:-translate-y-1.5 duration-200 hover:transition-all'>
                                <h4 className='font-bold '>{discussion.title}</h4>
                                <div className='flex justify-between items-center mt-2'>
                                    <p className='text-xs text-gray-400'><span>by </span>{discussion.author}</p>
                                    <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faComments} className='mr-1' />{discussion.comments} comments</p>
                                </div>
                            </div>
                            {index !== hotDiscussions.length - 1 && <hr className='border-gray-200' />}
                        </>
                    ))}
                </div>
            </div>
            <div className='bg-white rounded-3xl p-4 mt-5'>
                <h3 className='font-bold text-gray-800 flex items-center gap-2'>
                    <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
                    Top Creators
                </h3>
                <hr className='border-gray-200 mt-2' />
                <div className='flex flex-col gap-2 mt-2'>
                    {topCreators.map((creator, index) => (
                        <>
                            <div key={index} className='flex flex-col p-4 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:-translate-y-1.5 duration-200 hover:transition-all'>
                                <div className='flex justify-between items-center mt-2 gap-3'>
                                    <img className='w-10 h-10 rounded-full object-cover' src={creator.avatar} alt={creator.name} />
                                    <div className='flex flex-col flex-1'>
                                        <p className='text-md font-medium text-gray-800 leading-tight'>{creator.name}</p>
                                        <p className='text-xs text-gray-400'>{creator.followers} followers</p>
                                    </div>
                                    <button className='text-xs text-white bg-blue-500 px-3 py-2 rounded-full hover:bg-blue-600 hover:-translate-y-1.5 duration-200 hover:transition-all'>Follow</button>
                                </div>
                            </div>
                            {index !== topCreators.length - 1 && <hr className='border-gray-200' />}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trending

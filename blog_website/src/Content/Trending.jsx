import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faComments, faTrophy } from '@fortawesome/free-solid-svg-icons'

const trendingTags = [
    { name: "ReactJS", posts: 1240 },
    { name: "JavaScript", posts: 980 },
    { name: "TailwindCSS", posts: 756 },
    { name: "NodeJS", posts: 632 },
    { name: "TypeScript", posts: 589 },
    { name: "NextJS", posts: 421 },
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
        <div className="col-span-1 rounded-xl overflow-y-auto flex flex-col gap-4">
            {/* TRENDING TAGS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
                    <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                    Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                        <button
                            key={tag.name}
                            className="flex items-center gap-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                            <span>#</span>
                            <span>{tag.name}</span>
                            <span className="text-gray-400 ml-1">{tag.posts}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* HOT DISCUSSIONS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
                    <FontAwesomeIcon icon={faComments} className="text-blue-500" />
                    Hot Discussions
                </h3>
                <div className="flex flex-col gap-3">
                    {hotDiscussions.map((disc, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            <p className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                                {disc.title}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">by {disc.author}</span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <FontAwesomeIcon icon={faComments} className="text-[10px]" />
                                    {disc.comments}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TOP CREATORS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
                    <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
                    Top Creators
                </h3>
                <div className="flex flex-col gap-3">
                    {topCreators.map((creator, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="w-9 h-9 rounded-full"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">{creator.name}</p>
                                <p className="text-xs text-gray-400">{creator.followers} followers</p>
                            </div>
                            <button className="text-xs font-medium text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1 rounded-full transition-colors">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trending

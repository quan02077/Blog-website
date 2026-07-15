import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJs, faCss3Alt, faNodeJs } from '@fortawesome/free-brands-svg-icons'
import FeaturedCategoryCard from '../components/FeaturedCategoryCard'
import PopularCategoryCard from '../components/PopularCategoryCard'

const featuredCategories = [
    {
        id: 1,
        name: "React",
        icon: faReact,
        posts: 24,
        description: "Component-based UI, hooks, state management và React ecosystem.",
        color: "from-blue-500 to-cyan-400",
        badge: "Phổ biến nhất",
        badgeColor: "bg-blue-500",
    },
    {
        id: 2,
        name: "JavaScript",
        icon: faJs,
        posts: 38,
        description: "ES6+, async/await, DOM manipulation và các pattern hiện đại.",
        color: "from-yellow-400 to-amber-500",
        badge: "Nhiều bài nhất",
        badgeColor: "bg-yellow-500",
    },
]

const popularCategories = [
    { id: 1, name: "CSS", icon: faCss3Alt, posts: 17, description: "Flexbox, Grid, animations và Tailwind CSS.", color: "bg-pink-50 border-pink-100", iconColor: "text-pink-500", badgeColor: "bg-pink-100 text-pink-700" },
    { id: 2, name: "Node.js", icon: faNodeJs, posts: 12, description: "Backend, REST API, Express và npm ecosystem.", color: "bg-green-50 border-green-100", iconColor: "text-green-600", badgeColor: "bg-green-100 text-green-700" },
    { id: 3, name: "TypeScript", icon: faJs, posts: 9, description: "Type system, Generics, interfaces và best practices.", color: "bg-purple-50 border-purple-100", iconColor: "text-purple-500", badgeColor: "bg-purple-100 text-purple-700" },
    { id: 4, name: "Next.js", icon: faReact, posts: 8, description: "App router, Server Components, SSR và deployment.", color: "bg-gray-50 border-gray-200", iconColor: "text-gray-700", badgeColor: "bg-gray-100 text-gray-700" },
    { id: 5, name: "Git", icon: faLayerGroup, posts: 6, description: "Version control, branching, merge và GitHub workflow.", color: "bg-orange-50 border-orange-100", iconColor: "text-orange-500", badgeColor: "bg-orange-100 text-orange-700" },
    { id: 6, name: "DevOps", icon: faLayerGroup, posts: 5, description: "Docker, CI/CD, Nginx và cloud deployment.", color: "bg-indigo-50 border-indigo-100", iconColor: "text-indigo-500", badgeColor: "bg-indigo-100 text-indigo-700" },
]

function Categories() {
    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 leading-none mb-0.5">Chuyên mục</h1>
                    <p className="text-sm text-gray-500">Khám phá tất cả các chủ đề và chuyên mục bài viết</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm chuyên mục..."
                        readOnly
                        className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none placeholder-gray-300"
                    />
                </div>
            </div>

            {/* Featured */}
            <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">⭐ Nổi bật</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featuredCategories.map((cat) => (
                        <FeaturedCategoryCard key={cat.id} cat={cat} />
                    ))}
                </div>
            </div>

            {/* All Categories */}
            <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">📚 Tất cả chuyên mục</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {popularCategories.map((cat) => (
                        <PopularCategoryCard key={cat.id} cat={cat} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Categories

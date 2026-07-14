import { Route, Routes, NavLink } from "react-router-dom"
import Posts from "./Posts"
import Categories from "./Categories"
import PopularPosts from "./PopularPosts"
import Archives from "./Archives"
import './Content.css'
function Content() {
    return (
        <div className="grid grid-cols-4 gap-4 my-4 mx-20">
            <div className="col-span-1 w-full h-full bg-white border border-gray-200 rounded-xl p-4">
                <nav className="flex flex-col gap-1">
                    {/* DISCOVER SECTION */}
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">Discover</div>
                    <NavLink to="/posts" className={({ isActive }) => `sideBar ${isActive ? 'isActive' : 'isNoActive'}`}>
                        📝 All Posts
                    </NavLink>
                    <NavLink to="/popular" className={({ isActive }) => `sideBar ${isActive ? 'isActive' : 'isNoActive'}`}>
                        🔥 Popular Posts
                    </NavLink>

                    {/* ORGANIZE SECTION */}
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-1 px-2">Organize</div>
                    <NavLink to="/categories" className={({ isActive }) => `sideBar ${isActive ? 'isActive' : 'isNoActive'}`}>
                        🏷️ Categories
                    </NavLink>
                    <NavLink to="/archives" className={({ isActive }) => `sideBar ${isActive ? 'isActive' : 'isNoActive'}`}>
                        📁 Archives
                    </NavLink>

                    {/* INFO SECTION */}
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-1 px-2">Info</div>
                    <div className="flex gap-3">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded transition">
                            <i className="fa-brands fa-facebook"></i>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded transition">
                            <i className="fa-brands fa-instagram"></i>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded transition">
                            <i className="fa-brands fa-twitter"></i>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded transition">
                            <i className="fa-brands fa-youtube"></i>
                        </button>
                    </div>
                </nav>
            </div>
            <div className="col-span-2 bg-green-500">
                <Routes>
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/popular" element={<PopularPosts />} />
                    <Route path="/archives" element={<Archives />} />
                </Routes>
            </div>
            <div className="col-span-1 bg-red-500">
                trending
            </div>
        </div>
    )
}

export default Content
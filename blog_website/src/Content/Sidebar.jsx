import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Sidebar() {
    return (
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
                    <a href="https://www.facebook.com/nguyen.quan.930371/" target="_blank" rel="noopener noreferrer" className="hoverButton">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.instagram.com/1quononly?igsh=MWF1MGg5Mmp1cXZjag%3D%3D" target="_blank" rel="noopener noreferrer" className="hoverButton">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://github.com/quan02077" target="_blank" rel="noopener noreferrer" className="hoverButton">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.youtube.com/@QuanNguyen-hi1rq" target="_blank" rel="noopener noreferrer" className="hoverButton">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="https://www.linkedin.com/in/nguy%E1%BB%85n-nh%E1%BA%ADt-minh-qu%C3%A2n-b47500413/" target="_blank" rel="noopener noreferrer" className="hoverButton">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar

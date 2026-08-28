import { NavLink, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import useDirtyCheck from "../hooks/useDirtyCheck"

function Sidebar() {
    const location = useLocation()
    const { pathname } = location
    const confirmNavigation = useDirtyCheck()

    // Logic kiểm tra Active thông minh cho từng mục:
    const isAllPostsActive = pathname === '/posts' || pathname.startsWith('/post/')
    const isPopularActive = pathname === '/popular'
    const isCategoriesActive = pathname === '/categories'
    const isArchivesActive = pathname === '/archives'
    const isWriteActive = pathname === '/write'
    const isDraftsActive = pathname === '/drafts' || (pathname.startsWith('/write/') && pathname !== '/write')

    const getBtnClass = (isActive) => `sideBar ${isActive ? 'isActive' : 'isNoActive'}`

    const handleNavClick = (e) => {
        const proceed = confirmNavigation()
        if (!proceed) {
            e.preventDefault()
        }
    }

    return (
        <div className="w-full h-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-xl p-4 custom-scrollbar">
            <nav className="flex flex-col gap-1">
                {/* DISCOVER SECTION */}
                <div className="titleSideBar">Discover</div>
                <NavLink to="/posts" className={getBtnClass(isAllPostsActive)} onClick={handleNavClick}>
                    All Posts
                </NavLink>
                <NavLink to="/popular" className={getBtnClass(isPopularActive)} onClick={handleNavClick}>
                    Popular Posts
                </NavLink>

                {/* ORGANIZE SECTION */}
                <div className="titleSideBar">Organize</div>
                <NavLink to="/categories" className={getBtnClass(isCategoriesActive)} onClick={handleNavClick}>
                    Categories
                </NavLink>
                <NavLink to="/archives" className={getBtnClass(isArchivesActive)} onClick={handleNavClick}>
                    Archives
                </NavLink>

                {/* AUTHOR SECTION */}
                <div className="titleSideBar">AUTHOR</div>
                <NavLink to="/write" className={getBtnClass(isWriteActive)} onClick={handleNavClick}>
                    Write a New Post
                </NavLink>
                <NavLink to="/drafts" className={getBtnClass(isDraftsActive)} onClick={handleNavClick}>
                    Drafts
                </NavLink>

                {/* INFO SECTION */}
                <div className="titleSideBar">Info</div>
                <div className="flex flex-wrap gap-3">
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

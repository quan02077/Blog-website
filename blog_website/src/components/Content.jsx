import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import Trending from "./Trending"
import './Content.css'

function Content() {
    return (
        <div className="grid grid-cols-4 gap-4 py-4 px-20 flex-1 overflow-hidden">
            <Sidebar />
            <MainContent />
            <Trending />
        </div>
    )
}

export default Content
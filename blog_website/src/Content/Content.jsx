import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import Trending from "./Trending"
import './Content.css'

function Content() {
    return (
        <div className="grid grid-cols-4 gap-4 my-4 mx-20">
            <Sidebar />
            <MainContent />
            <Trending />
        </div>
    )
}

export default Content
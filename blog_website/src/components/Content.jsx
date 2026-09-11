import Sidebar from "./Sidebar"
import MainContent from "./MainContent"

function Content() {
    return (
        <div className="grid grid-cols-[240px_1fr] gap-6 py-4 px-20 flex-1 overflow-hidden">
            <Sidebar />
            <MainContent />
        </div>
    )
}

export default Content
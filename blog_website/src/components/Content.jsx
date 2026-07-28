import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import SideBar_Right from "./SideBar_Right"

function Content() {
    return (
        <div className="grid grid-cols-[240px_1fr_280px] gap-4 py-4 px-20 flex-1 overflow-hidden">
            <Sidebar />
            <MainContent />
            <SideBar_Right />
        </div>
    )
}

export default Content
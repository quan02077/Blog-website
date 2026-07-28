import Trending from "./Trending"
import Discussions from "./Discussions"
import TopCreator from "./TopCreator"

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

function SideBar_Right() {
    return (
        <div className='custom-scrollbar group'>
            <Trending trendingTags={trendingTags} />
            <Discussions hotDiscussions={hotDiscussions} />
            <TopCreator topCreators={topCreators} />
        </div>
    )
}

export default SideBar_Right

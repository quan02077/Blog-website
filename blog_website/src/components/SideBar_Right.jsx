import Trending from "./Trending"
import Discussions from "./Discussions"
import TopCreator from "./TopCreator"
import { trendingTags, hotDiscussions, topCreators } from "../data/sideBarRightData";

function SideBar_Right() {
    return (
        <div className='custom-scrollbar'>
            <Trending trendingTags={trendingTags} />
            <Discussions hotDiscussions={hotDiscussions} />
            <TopCreator topCreators={topCreators} />
        </div>
    )
}

export default SideBar_Right

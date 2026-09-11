import { useState, useEffect } from "react"
import Trending from "./Trending"
import Discussions from "./Discussions"
import { getHotDiscussions, getTrendingTags } from "../api/post"

function SideBar_Right() {
    const [trendingTags, setTrendingTags] = useState([])
    const [hotDiscussions, setHotDiscussions] = useState([])

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const [tagsData, discussionsData] = await Promise.all([
                    getTrendingTags(),
                    getHotDiscussions()
                ]);

                setTrendingTags(tagsData || []);
                setHotDiscussions(discussionsData || []);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu sidebar:", error);
            }
        };

        fetchSidebarData();
    }, []);

    return (
        <div className='custom-scrollbar'>
            <Trending trendingTags={trendingTags} />
            <Discussions hotDiscussions={hotDiscussions} />
        </div>
    )
}

export default SideBar_Right

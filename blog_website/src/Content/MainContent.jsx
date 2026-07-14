import { Route, Routes } from "react-router-dom"
import Posts from "../pages/Posts"
import Categories from "../pages/Categories"
import PopularPosts from "../pages/PopularPosts"
import Archives from "../pages/Archives"

function MainContent() {
    return (
        <div className="col-span-2 bg-green-500">
            <Routes>
                <Route path="/posts" element={<Posts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/popular" element={<PopularPosts />} />
                <Route path="/archives" element={<Archives />} />
            </Routes>
        </div>
    )
}

export default MainContent

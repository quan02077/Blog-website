import { Route, Routes, Navigate } from "react-router-dom"
import Posts from "../pages/Posts"
import Categories from "../pages/Categories"
import PopularPosts from "../pages/PopularPosts"
import Archives from "../pages/Archives"
import WritePost from "../pages/WritePost"
import Drafts from "../pages/Drafts"

function MainContent() {
    return (
        <div className="overflow-y-auto group [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <Routes>
                <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/popular" element={<PopularPosts />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/write" element={<WritePost />} />
                <Route path="/drafts" element={<Drafts />} />
            </Routes>
        </div>
    )
}

export default MainContent

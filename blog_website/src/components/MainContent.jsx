import { Route, Routes, Navigate } from "react-router-dom"
import Posts from "../pages/Posts"
import Categories from "../pages/Categories"
import PopularPosts from "../pages/PopularPosts"
import Archives from "../pages/Archives"
import WritePost from "../pages/WritePost"
import Drafts from "../pages/Drafts"
import PostDetail from "../pages/PostDetail"

function MainContent() {
    return (
        <div className="custom-scrollbar group">
            <Routes>
                <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/populars" element={<PopularPosts />} />
                <Route path="/popular/:id" element={<PostDetail />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/write" element={<WritePost />} />
                <Route path="/write/:id" element={<WritePost />} />
                <Route path="/drafts" element={<Drafts />} />
            </Routes>
        </div>
    )
}

export default MainContent

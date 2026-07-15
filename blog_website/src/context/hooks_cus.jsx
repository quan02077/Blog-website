import { useContext } from "react";
import Blog_context from "./Blog_Context";

export const useBlog = () => {
    const [state, dispatch] = useContext(Blog_context)
    return [state, dispatch]
}
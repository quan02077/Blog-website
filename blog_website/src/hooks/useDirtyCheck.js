import { useContext } from 'react'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

export default function useDirtyCheck() {
    const [state, dispatch] = useContext(Blog_context)

    const confirmNavigation = (onConfirm) => {
        if (state.isDirty) {
            const confirmLeave = window.confirm("Bài viết của bạn chưa được lưu, bạn có chắc muốn rời trang?")
            if (!confirmLeave) return false
            dispatch(action.isDirtyAction(false))
        }
        if (onConfirm) onConfirm()
        return true
    }

    return confirmNavigation
}

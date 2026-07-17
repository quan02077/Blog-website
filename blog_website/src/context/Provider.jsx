import { useReducer, useEffect } from 'react'
import Blog_context from './Blog_Context'
import reducer, { initialState } from './Reducer'

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('darkMode', 'true')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('darkMode', 'false')
        }
    }, [state.darkMode])
    return (
        <Blog_context.Provider value={[state, dispatch]}>
            {children}
        </Blog_context.Provider>
    )
}

export default Provider
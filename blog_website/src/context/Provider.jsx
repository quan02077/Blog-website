import { useReducer } from 'react'
import Blog_context from './Blog_Context'
import reducer, { initialState } from './Reducer'

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Blog_context.Provider value={[state, dispatch]}>
            {children}
        </Blog_context.Provider>
    )
}

export default Provider
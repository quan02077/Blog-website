import { useReducer, useEffect } from 'react'
import Blog_context from './Blog_Context'
import reducer, { initialState } from './Reducer'
import * as action from './Actions'
import { getMeApi } from '../api/auth'

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
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) return null;
            try {
                const data = await getMeApi(token);
                const loggedUser = data.user || data;
                dispatch(action.loginAction(loggedUser))
            } catch (error) {
                if (error.message === 'Unauthorized') {
                    dispatch(action.logOutAction());
                } else {
                    console.error('Lỗi xác thực:', error);
                }
            }
        };
        verifyToken();
    }, [])
    return (
        <Blog_context.Provider value={[state, dispatch]}>
            {children}
        </Blog_context.Provider>
    )
}

export default Provider
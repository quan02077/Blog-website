import { useReducer, useEffect } from 'react'
import Blog_context from './Blog_Context'
import reducer, { initialState } from './Reducer'
import * as action from './Actions'

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
                const reponse = await fetch('http://localhost:5264/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (reponse.ok) {
                    const data = await reponse.json();
                    const loggedUser = data.user || data;
                    dispatch(action.loginAction(loggedUser))
                } else if (reponse.status === 401) {
                    dispatch(action.logOutAction());
                }
            } catch (error) {
                console.error('Lỗi xác thực:', error);
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
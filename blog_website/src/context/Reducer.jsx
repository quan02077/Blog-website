// import { LOGIN, LOGOUT } from "./Constant";
import { TOGGLE_DARK_MODE } from "./Constant";

export const initialState = {
    user: null,
    darkMode: localStorage.getItem('darkMode') === 'true'
}

function reducer(state, action) {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

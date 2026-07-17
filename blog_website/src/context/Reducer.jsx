// import { LOGIN, LOGOUT } from "./Constant";
import { TOGGLE_DARK_MODE, BTN_SIGN_IN_UP } from "./Constant";

export const initialState = {
    user: null,
    darkMode: localStorage.getItem('darkMode') === 'true',
    btnSignInUp: false,
}

function reducer(state, action) {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }
        case BTN_SIGN_IN_UP:
            return {
                ...state,
                btnSignInUp: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

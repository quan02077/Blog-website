import { INPUT_EMAIL, INPUT_PASSWORD, INPUT_USERNAME, TOGGLE_DARK_MODE, BTN_SIGN_IN_UP } from "./Constant";

export const initialState = {
    isSignIn: false,
    username: ' ',
    email: ' ',
    password: ' ',
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
        case INPUT_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case INPUT_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case INPUT_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

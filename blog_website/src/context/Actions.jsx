import { LOGIN, LOGOUT, TOGGLE_DARK_MODE, BTN_SIGN_IN_UP } from "./Constant";

export const loginAction = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const logoutAction = (payload) => {
    return {
        type: LOGOUT,
        payload
    }
}

export const toggleDarkModeAction = (payload) => {
    return {
        type: TOGGLE_DARK_MODE,
        payload
    }
}

export const btnSignInUpAction = (payload) => {
    return {
        type: BTN_SIGN_IN_UP,
        payload
    }
}

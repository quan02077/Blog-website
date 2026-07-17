import { LOGIN, LOGOUT, TOGGLE_DARK_MODE } from "./Constant";

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

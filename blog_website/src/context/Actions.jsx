import {
    LOGIN,
    REGISTER,
    TOGGLE_DARK_MODE,
    BTN_SIGN_IN_UP,
    TOGGLE_ACCOUNT,
    LOG_OUT,
    TOGGLE_INFO,
    TOGGLE_MY_POSTS,
    TOGGLE_SETTINGS,
    UPDATE_INFO
} from "./Constant";

export const loginAction = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const registerAction = (payload) => {
    return {
        type: REGISTER,
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


export const toggleAccountAction = (payload) => {
    return {
        type: TOGGLE_ACCOUNT,
        payload
    }
}

export const logOutAction = () => {
    return {
        type: LOG_OUT,
        payload: false
    }
}

export const toggleInfoAction = (payload) => {
    return {
        type: TOGGLE_INFO,
        payload
    }
}

export const toggleMyPostsAction = (payload) => {
    return {
        type: TOGGLE_MY_POSTS,
        payload
    }
}

export const toggleSettingsAction = (payload) => {
    return {
        type: TOGGLE_SETTINGS,
        payload
    }
}

export const updateInfoAction = (payload) => {
    return {
        type: UPDATE_INFO,
        payload
    }
}
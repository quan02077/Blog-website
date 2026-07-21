import {
    LOGIN,
    REGISTER,
    INPUT_EMAIL,
    INPUT_PASSWORD,
    INPUT_USERNAME,
    TOGGLE_DARK_MODE,
    BTN_SIGN_IN_UP,
    TOGGLE_ACCOUNT
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

export const inputEmailAction = (payload) => {
    return {
        type: INPUT_EMAIL,
        payload
    }
}

export const inputPasswordAction = (payload) => {
    return {
        type: INPUT_PASSWORD,
        payload
    }
}

export const inputUsernameAction = (payload) => {
    return {
        type: INPUT_USERNAME,
        payload
    }
}

export const toggleAccountAction = (payload) => {
    return {
        type: TOGGLE_ACCOUNT,
        payload
    }
}

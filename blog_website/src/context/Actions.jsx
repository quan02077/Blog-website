import { LOGIN, LOGOUT } from "./Constant";

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
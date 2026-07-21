import {
    LOGIN,
    REGISTER,
    INPUT_EMAIL,
    INPUT_PASSWORD,
    INPUT_USERNAME,
    TOGGLE_DARK_MODE,
    BTN_SIGN_IN_UP,
    TOGGLE_ACCOUNT,
    LOG_OUT
} from "./Constant";

export const initialState = {
    isSignIn: localStorage.getItem('isSignIn') === 'true',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    username: '',
    email: '',
    password: '',
    users: JSON.parse(localStorage.getItem('users')) || [],
    darkMode: localStorage.getItem('darkMode') === 'true',
    btnSignInUp: false,
    btnAccount: false
}

function reducer(state, action) {
    switch (action.type) {
        case TOGGLE_DARK_MODE: {
            const newDarkMode = action.payload;
            let newUsers = state.users;
            let newCurrentUser = state.currentUser;

            // Lưu chung vào trình duyệt
            localStorage.setItem('darkMode', newDarkMode);

            // Nếu đang đăng nhập, lưu luôn vào tài khoản của người đó
            if (state.currentUser) {
                newUsers = state.users.map(user =>
                    user.email === state.currentUser.email
                        ? { ...user, darkMode: newDarkMode }
                        : user
                );
                localStorage.setItem('users', JSON.stringify(newUsers));
                newCurrentUser = { ...state.currentUser, darkMode: newDarkMode };
            }

            return {
                ...state,
                darkMode: newDarkMode,
                users: newUsers,
                currentUser: newCurrentUser
            }
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
        case LOGIN: {
            if (action.payload === false) { // Trường hợp Đăng xuất cũ
                localStorage.removeItem('currentUser');
                localStorage.setItem('isSignIn', 'false');
                return {
                    ...state,
                    isSignIn: false,
                    currentUser: null
                }
            }

            // Trường hợp Đăng nhập
            const loggedUser = action.payload;
            const userDarkMode = loggedUser.darkMode !== undefined ? loggedUser.darkMode : state.darkMode;
            
            // Cập nhật lại giao diện và lưu trạng thái đăng nhập
            localStorage.setItem('darkMode', userDarkMode);
            localStorage.setItem('currentUser', JSON.stringify(loggedUser));
            localStorage.setItem('isSignIn', 'true');

            return {
                ...state,
                isSignIn: true,
                currentUser: loggedUser,
                darkMode: userDarkMode,
                email: '',
                password: '',
                btnSignInUp: false // Tắt modal form đi
            }
        }
        case REGISTER:
            {
                // Khi đăng ký, gán luôn cài đặt dark mode hiện tại cho user mới
                const newUser = {
                    ...action.payload,
                    darkMode: state.darkMode
                };
                const newUsers = [...state.users, newUser];
                localStorage.setItem('users', JSON.stringify(newUsers));
                return {
                    ...state,
                    users: newUsers,
                    username: '',
                    email: '',
                    password: ''
                }
            }
        case TOGGLE_ACCOUNT:
            return {
                ...state,
                btnAccount: action.payload
            }
        case LOG_OUT:
            localStorage.removeItem('currentUser');
            localStorage.setItem('isSignIn', 'false');
            return {
                ...state,
                isSignIn: false,
                currentUser: null,
                btnAccount: false // Ẩn luôn menu account
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

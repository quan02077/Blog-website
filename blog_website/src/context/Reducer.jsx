import {
    LOGIN,
    REGISTER,
    TOGGLE_DARK_MODE,
    BTN_SIGN_IN_UP,
    TOGGLE_ACCOUNT,
    LOG_OUT,
    TOGGLE_INFO,
    TOGGLE_MY_POSTS,
    TOGGLE_BOOKMARKS,
    TOGGLE_NOTIFICATIONS,
    TOGGLE_SETTINGS,
    UPDATE_INFO,
    PUBLISH_POST,
    SAVE_DRAFTS,
    CREATE_CATEGORY
} from "./Constant";

export const initialState = {
    isSignIn: localStorage.getItem('isSignIn') === 'true',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [],
    darkMode: localStorage.getItem('darkMode') === 'true',
    btnSignInUp: false,
    btnAccount: false,
    btnInfo: false,
    btnMyPosts: false,
    btnBookmarks: false,
    btnNotifications: false,
    btnSettings: false,
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    drafts: JSON.parse(localStorage.getItem('drafts')) || [],
    categories: JSON.parse(localStorage.getItem('categories')) || [],
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
                    btnSignInUp: false // Đăng ký xong thì tắt modal đi (hoặc đổi qua tab login tùy bạn)
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
        case TOGGLE_INFO:
            return {
                ...state,
                btnInfo: action.payload
            }
        case TOGGLE_MY_POSTS:
            return {
                ...state,
                btnMyPosts: action.payload
            }
        case TOGGLE_BOOKMARKS:
            return {
                ...state,
                btnBookmarks: action.payload
            }
        case TOGGLE_NOTIFICATIONS:
            return {
                ...state,
                btnNotifications: action.payload
            }
        case TOGGLE_SETTINGS:
            return {
                ...state,
                btnSettings: action.payload
            }
        case UPDATE_INFO:
            {
                const updatedUser = action.payload;
                // Cập nhật lại thông tin user trong danh sách users
                const updatedUsers = state.users.map(user =>
                    user.email === state.currentUser?.email ? { ...user, ...updatedUser } : user
                );
                // Lưu thông tin mới vào Local Storage
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                return {
                    ...state,
                    currentUser: updatedUser,
                    users: updatedUsers,
                    btnInfo: false
                }
            }
        case PUBLISH_POST:
            {
                const newPost = {
                    id: Date.now(),
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                    author: state.currentUser?.username,
                    avatar: state.currentUser?.avatar,
                    authorEmail: state.currentUser?.email
                };
                const newPosts = [...state.posts, newPost];
                localStorage.setItem('posts', JSON.stringify(newPosts));
                return {
                    ...state,
                    posts: newPosts,
                }
            }
        case SAVE_DRAFTS:
            {
                const newDraft = {
                    id: Date.now(),
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                    author: state.currentUser?.username,
                    avatar: state.currentUser?.avatar,
                    authorEmail: state.currentUser?.email
                };
                const newDrafts = [...state.drafts, newDraft];
                localStorage.setItem('drafts', JSON.stringify(newDrafts));
                return {
                    ...state,
                    drafts: newDrafts,
                }
            }
        case CREATE_CATEGORY:
            {
                const newCategory = action.payload
                const newCategories = [...state.categories, newCategory];
                localStorage.setItem('categories', JSON.stringify(newCategories));
                return {
                    ...state,
                    categories: newCategories,
                }
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

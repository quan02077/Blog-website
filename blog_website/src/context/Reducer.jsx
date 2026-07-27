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
    CREATE_CATEGORY,
    DELETE_POSTS,
    DELETE_DRAFT,
    UPDATE_DRAFT,
    SORT_BY,
    SEARCH,
    FILTER_STATUS,
    BOOKMARKS
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
    search: '',
    sortBy: 'latest',
    filter: 'all',
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
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
                    description: action.payload?.summary || action.payload?.description || '',
                    date: new Date().toLocaleDateString('vi-VN'),
                    createdAt: new Date().toISOString(),
                    author: state.currentUser?.username || 'Ẩn danh',
                    avatar: state.currentUser?.avatar || 'https://ui-avatars.com/api/?name=User',
                    authorEmail: state.currentUser?.email,
                    likes: 0,
                    comments: 0,
                    readTime: `${action.payload?.readTime || 1} phút đọc`
                };
                const newPosts = [newPost, ...state.posts];
                try {
                    localStorage.setItem('posts', JSON.stringify(newPosts));
                } catch (error) {
                    console.warn('LocalStorage bị đầy, không thể lưu thêm bài viết:', error);
                }
                return {
                    ...state,
                    posts: newPosts,
                }
            }
        case SAVE_DRAFTS:
            {
                const newDraft = {
                    id: action.payload?.id || Date.now(),
                    ...action.payload,
                    description: action.payload?.summary || action.payload?.description || '',
                    date: new Date().toLocaleDateString('vi-VN'),
                    createdAt: new Date().toISOString(),
                    author: state.currentUser?.username || 'Ẩn danh',
                    avatar: state.currentUser?.avatar || 'https://ui-avatars.com/api/?name=User',
                    authorEmail: state.currentUser?.email,
                    likes: 0,
                    comments: 0,
                    readTime: `${action.payload?.readTime || 1} phút đọc`
                };
                const newDrafts = [newDraft, ...state.drafts];
                try {
                    localStorage.setItem('drafts', JSON.stringify(newDrafts));
                } catch (error) {
                    console.warn('LocalStorage bị đầy, không thể lưu thêm bản nháp:', error);
                }
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
        case DELETE_POSTS:
            {
                const targetIds = Array.isArray(action.payload) ? action.payload : [action.payload];
                const newPosts = state.posts.filter(post => !targetIds.includes(post.id));
                try {
                    localStorage.setItem('posts', JSON.stringify(newPosts));
                } catch (error) {
                    console.warn('LocalStorage error:', error);
                }
                return {
                    ...state,
                    posts: newPosts,
                }
            }
        case DELETE_DRAFT:
            {
                const targetIds = Array.isArray(action.payload) ? action.payload : [action.payload];
                const newDrafts = state.drafts.filter(draft => !targetIds.includes(draft.id));
                try {
                    localStorage.setItem('drafts', JSON.stringify(newDrafts));
                } catch (error) {
                    console.warn('LocalStorage error:', error);
                }
                return {
                    ...state,
                    drafts: newDrafts,
                }
            }
        case UPDATE_DRAFT:
            {
                const updateDraft = action.payload
                const newDrafts = state.drafts.map(draft =>
                    String(draft.id) === String(updateDraft.id)
                        ? {
                            ...draft,
                            ...updateDraft,
                            description: updateDraft.summary || updateDraft.description || '',
                            readTime: typeof updateDraft.readTime === 'number' ? `${updateDraft.readTime} phút đọc` : updateDraft.readTime,
                            updatedAt: new Date().toISOString()
                        }
                        : draft
                );
                try {
                    localStorage.setItem('drafts', JSON.stringify(newDrafts));
                } catch (error) {
                    console.warn('LocalStorage error:', error);
                }
                return {
                    ...state,
                    drafts: newDrafts,
                }
            }
        case SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case FILTER_STATUS:
            return {
                ...state,
                filter: action.payload
            }
        case BOOKMARKS:
            {
                const targetPost = action.payload
                if (!targetPost || !targetPost.id) return state;

                const isAlreadyBookmarked = state.bookmarks.some(b => String(b.id) === String(targetPost.id))

                const newBookmarks = isAlreadyBookmarked
                    ? state.bookmarks.filter(b => String(b.id) !== String(targetPost.id))
                    : [targetPost, ...state.bookmarks]

                try {
                    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
                } catch (error) {
                    console.warn('LocalStorage error:', error);
                }
                return {
                    ...state,
                    bookmarks: newBookmarks
                }
            }
        default:
            throw new Error('Invalid action');
    }
}

export default reducer

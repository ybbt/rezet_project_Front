export const POST_ROUTES = {
    SET_POST: "/posts",
    HOME_POSTS: "/posts",
    GET_POST: (postId) => `/posts/${postId}`,
    UPDATE_POST: (postId) => `/posts/${postId}8`,
    DELETE_POST: (postId) => `/posts/${postId}`,
    GET_USER_POSTS: (userName) => `/users/${userName}/posts`,
};

export const AUTHORIZE_ROUTES = {
    SIGN_UP: "/register",
    SIGN_IN: "/login",
    SIGN_OUT: "/logout",
    AUTH_ME: "/me",
};

export const USER_ROUTES = {
    GET_USER: (userName) => `/users/${userName}`,
};

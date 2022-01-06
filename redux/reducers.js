import { combineReducers } from "redux";
import * as types from "./actionsTypes";

// INITIAL POSTS STATE
const initialPostsState = {
    postsList: [],
};

// INITIAL POSTS STATE
const initialCommentsState = {
    commentsList: [],
};

// INITIAL USER POSTS STATE
const initialPostState = {
    post: {},
};

// INITIAL AUTH STATE
const initialAuthState = {
    signedUser: {},
};

// INITIAL ERRORS STATE
const initialErrorsState = {
    error: false,
};

// INITIAL USER STATE
const initialUserState = {
    user: {},
};

// TODO Зробити заміну кількості коментарів після видалення та додавання
// COMMENTS REDUCER
const commentsReducer = (state = initialCommentsState, { type, payload }) => {
    switch (type) {
        case types.SET_POST_COMMENTS:
            const newState = Object.assign({}, state, {
                commentsList: payload.postComments,
            });
            // console.log(newState, "SET_POST_COMMENTS in switch");
            return newState;
            break;
        case types.SEND_COMMENT:
            console.log(payload, "payload SEND_COMMENT in switch");
            return Object.assign({}, state, {
                commentsList: [
                    payload && payload.comment,
                    ...state.commentsList,
                ],
            });
            break;
        case types.UPDATE_COMMENT:
            const newCommentsListUpdated = state.commentsList.map(
                (commentItem) =>
                    commentItem.id === payload.updatedComment.id
                        ? { ...commentItem, ...payload.updatedComment }
                        : commentItem
            );
            // console.log(newCommentsList, "newCommentsList");
            return Object.assign({}, state, {
                commentsList: newCommentsListUpdated,
            });
        case types.DELETE_COMMENT:
            const newCommentsListDeleted = state.commentsList.filter(
                (commentItem) => commentItem.id !== payload.deletedComment.id
            );
            // console.log(newCommentsList, "newCommentsList");
            return Object.assign({}, state, {
                commentsList: newCommentsListDeleted,
            });
            break;
        default:
            return state;
    }
};

// USERS REDUCER
const userReducer = (state = initialUserState, { type, payload }) => {
    switch (type) {
        case types.SET_USER:
            console.log("SET_USER in switch");
            return Object.assign({}, state, {
                user: payload.user,
            });
            break;

        default:
            return state;
    }
};

// POST REDUCER
const postReducer = (state = initialPostState, { type, payload }) => {
    switch (type) {
        case types.SET_POST_SINGLE:
            console.log("SET_POST in switch");
            return Object.assign({}, state, {
                post: payload.post,
            });
            break;
        case types.UPDATE_POST_SINGLE:
            console.log("UPDATE_POST_SINGLE in switch");
            return Object.assign({}, state, {
                post: { ...state.post, ...payload.updatedPost },
            });
            break;
        case types.DELETE_POST_SINGLE:
            console.log("DELETE_POST_SINGLE in switch");
            return Object.assign({}, state, {
                post: {},
            });
            break;
        default:
            return state;
    }
};

// POSTS REDUCER
const postsReducer = (state = initialPostsState, { type, payload }) => {
    const newPostsList = {};
    switch (type) {
        case types.SET_POSTS:
            console.log("SET_POSTS in switch");
            return Object.assign({}, state, {
                postsList: payload.posts,
            });
            break;
        case types.SEND_POST:
            console.log("SEND_POST in switch");
            return Object.assign({}, state, {
                postsList: [payload && payload.post, ...state.postsList],
            });
            break;
        case types.DELETE_POST:
            console.log("DELETE_POST in switch");
            /* const */ newPostsList = state.postsList.filter(
                (postItem) => postItem.id !== payload.post.id
            );
            return Object.assign({}, state, {
                postsList: newPostsList,
            });
            break;
        case types.UPDATE_POST:
            console.log("UPDATE_POST in switch");
            /* const  */ newPostsList = state.postsList.map((postItem) =>
                postItem.id === payload.updatedPost.id
                    ? { ...postItem, ...payload.updatedPost }
                    : postItem
            );
            return Object.assign({}, state, {
                postsList: newPostsList,
            });
            break;
        case types.SET_USER_POSTS:
            console.log("SET_USER_POSTS in switch");
            return Object.assign({}, state, {
                postsList: payload.userPosts,
                name: "boss",
            });
            break;
        default:
            return state;
    }
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case types.AUTH_ME:
            console.log("AUTH_ME in switch");
            // Object.assign({}, state, {
            //     signedUser: payload.signedUser,
            // });
            return Object.assign({}, state, {
                signedUser: payload.signedUser,
            });
            break;
        case types.LOGOUT:
            console.log("LOGOUT in switch");
            return Object.assign({}, state, {
                signedUser: payload.signedUser,
            });
            break;
        default:
            return state;
    }
};

const errorReducer = (state = initialErrorsState, { type, payload }) => {
    switch (type) {
        case types.SET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                error: payload.error,
            });
            break;
        case types.UNSET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                error: false,
            });
            break;
        default:
            return state;
    }
};

// COMBINED REDUCERS
const reducers = {
    commentsReducer,
    postReducer,
    userReducer,
    postsReducer,
    authReducer,
    errorReducer,
};

export default combineReducers(reducers);

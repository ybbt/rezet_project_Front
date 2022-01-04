import { combineReducers } from "redux";
import * as types from "./actionsTypes";

// INITIAL POSTS STATE
const initialPostsState = {
    postsList: [],
};

// INITIAL AUTH STATE
const initialAuthState = {
    signedUser: {},
};

// INITIAL ERRORS STATE
const initialErrorsState = {
    error: false,
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
        default:
            return state;
    }
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case types.AUTH_ME:
            console.log("AUTH_ME in switch");
            const YYY = Object.assign({}, state, {
                signedUser: payload.signedUser,
            });
            console.log(YYY, "in AUTH_ME");
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
    authReducer,
    postsReducer,
    errorReducer,
};

export default combineReducers(reducers);

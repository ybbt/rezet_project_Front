import { combineReducers } from "redux";
import * as types from "./actionsTypes";

// INITIAL POSTS STATE
const initialPostsState = {
    postsList: [],
    // light: false,
};

// POSTS REDUCER
const postsReducer = (state = initialPostsState, { type, payload }) => {
    // console.log(payload && payload.posts.data, "postsReducer before switch");
    // console.log(type, "type in postsReducer before switch");
    const newPostsList = {};
    switch (type) {
        case types.SET_POSTS:
            // console.log("SET_POSTS in switch");
            return {
                postsList: payload && payload.posts, //.data,
            };
            break;
        case types.SEND_POST:
            console.log("SEND_POST in switch");
            return {
                postsList: [payload && payload.post, ...state.postsList],
            };
            break;
        case types.DELETE_POST:
            console.log("DELETE_POST in switch");
            /* const */ newPostsList = state.postsList.filter(
                (postItem) => postItem.id !== payload.post.id
            );
            return {
                postsList: newPostsList,
            };
            break;
        case types.UPDATE_POST:
            console.log("UPDATE_POST in switch");
            /* const  */ newPostsList = state.postsList.map((postItem) =>
                postItem.id === payload.updatedPost.id
                    ? { ...postItem, ...payload.updatedPost }
                    : postItem
            );
            return {
                postsList: newPostsList,
            };
            break;
        default:
            return state;
    }
};

// COMBINED REDUCERS
const reducers = {
    // counter: counterReducer,
    postsReducer,
};

export default combineReducers(reducers);

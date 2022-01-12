import * as types from "../actionsTypes";

const initialPostsState = {
    postsList: [],
};

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
                postsList: [/* payload &&  */ payload.post, ...state.postsList],
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

export default postsReducer;

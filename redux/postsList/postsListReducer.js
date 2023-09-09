import * as types from "../actionsTypes";

const initialPostsState = {
    postsList: [],
};

const postsListReducer = (state = initialPostsState, { type, payload }) => {
    switch (type) {
        case types.SET_POSTSLIST:
            return {
                ...state,
                ...{
                    postsList: payload.posts,
                },
            };
            break;

        case types.NEW_POST_IN_LIST:
            return {
                ...state,
                ...{
                    postsList: [payload.post, ...state.postsList],
                },
            };
            break;
        case types.DELETE_POST_IN_LIST:
            const newPostsListDelete = state.postsList.filter(
                (postItem) => postItem.id !== payload.post.id
            );
            return {
                ...state,
                ...{
                    postsList: newPostsListDelete,
                },
            };
            break;
        case types.UPDATE_POST_IN_LIST:
            const newPostsListUpdate = state.postsList.map((postItem) =>
                postItem.id === payload.updatedData.id
                    ? { ...postItem, ...payload.updatedData }
                    : postItem
            );
            return {
                ...state,
                ...{
                    postsList: newPostsListUpdate,
                },
            };
            break;
        default:
            return state;
    }
};

export default postsListReducer;

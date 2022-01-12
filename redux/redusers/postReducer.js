import * as types from "../actionsTypes";

const initialPostState = {
    activePost: {},
};

const postReducer = (state = initialPostState, { type, payload }) => {
    switch (type) {
        case types.SET_POST_SINGLE:
            console.log("SET_POST in switch");
            return Object.assign({}, state, {
                activePost: payload.post,
            });
            break;
        case types.UPDATE_POST_SINGLE:
            console.log("UPDATE_POST_SINGLE in switch");
            return Object.assign({}, state, {
                activePost:
                    payload.updatedPost /* { ...state.activePost, ...payload.updatedPost }, */,
            });
            break;
        case types.DELETE_POST_SINGLE:
            console.log("DELETE_POST_SINGLE in switch");
            return Object.assign({}, state, {
                activePost: {},
            });
            break;
        case types.INCREMENT_COMMENTS_COUNT:
            console.log("INCREMENT_COMMENTS_COUNT in switch");
            const newPostDataIncrement = {
                ...state.activePost,
                comments_count: state.activePost.comments_count + 1,
            };
            return Object.assign({}, state, {
                activePost: newPostDataIncrement,
            });
            break;
        case types.DECREMENT_COMMENTS_COUNT:
            console.log("DECREMENT_COMMENTS_COUNT in switch");
            const newPostDataDecrement = {
                ...state.activePost,
                comments_count: state.activePost.comments_count - 1,
            };
            return Object.assign({}, state, {
                activePost: newPostDataDecrement,
            });
            break;
        default:
            return state;
    }
};

export default postReducer;

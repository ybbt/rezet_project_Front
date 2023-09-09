import * as types from "../actionsTypes";

const initialPostState = {
    activePost: {},
    isDelited: false,
};

const activePostReducer = (state = initialPostState, { type, payload }) => {
    switch (type) {
        case types.SET_ACTIVEPOST:
            return {
                ...state,
                ...{
                    activePost: payload.post,
                },
            };
            break;
        case types.UPDATE_ACTIVEPOST:
            return {
                ...state,
                ...{
                    activePost: {
                        ...payload.updatedPost,
                    },
                },
            };
            break;
        case types.DELETE_ACTIVEPOST:
            return {
                ...state,
                ...{
                    isDelited: true,
                },
            };
            break;
        case types.INCREMENT_COMMENTS_COUNT:
            const newPostDataIncrement = {
                ...state.activePost,
                comments_count: state.activePost.comments_count + 1,
            };
            return {
                ...state,
                ...{
                    activePost: newPostDataIncrement,
                },
            };
            break;
        case types.DECREMENT_COMMENTS_COUNT:
            const newPostDataDecrement = {
                ...state.activePost,
                comments_count: state.activePost.comments_count - 1,
            };
            return {
                ...state,
                ...{
                    activePost: newPostDataDecrement,
                },
            };
            break;
        default:
            return state;
    }
};

export default activePostReducer;

import * as types from "../actionsTypes";

const initialUserState = {
    user: {},
};

const activeUserReducer = (state = initialUserState, { type, payload }) => {
    switch (type) {
        case types.SET_USER:
            return {
                ...state,
                ...{
                    user: payload.user,
                },
            };
            break;
        case types.INCREMENT_POSTS_COUNT:
            const newUserDataIncrement = {
                ...state.user,
                posts_count: state.user.posts_count + 1,
            };
            return {
                ...state,
                ...{
                    user: newUserDataIncrement,
                },
            };
            break;
        case types.DECREMENT_POSTS_COUNT:
            const newUserDataDecrement = {
                ...state.user,
                posts_count: state.user.posts_count - 1,
            };
            return {
                ...state,
                ...{
                    user: newUserDataDecrement,
                },
            };
            break;
        default:
            return state;
    }
};

export default activeUserReducer;

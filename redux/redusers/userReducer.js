import * as types from "../actionsTypes";

const initialUserState = {
    user: {},
};

const userReducer = (state = initialUserState, { type, payload }) => {
    switch (type) {
        case types.SET_USER:
            console.log("SET_USER in switch");
            // TODO продумати доцільність такого варіанту
            // if (!payload.user.avatar_path) {
            //     payload.user.avatar_path = "/avatar"
            // }
            return Object.assign({}, state, {
                user: payload.user,
            });
            break;
        case types.INCREMENT_POSTS_COUNT:
            console.log("UPDATE_POSTS_COUNT in switch");
            const newUserDataIncrement = {
                ...state.user,
                posts_count: state.user.posts_count + 1,
            };
            return Object.assign({}, state, {
                user: newUserDataIncrement,
            });
            break;
        case types.DECREMENT_POSTS_COUNT:
            console.log("DECREMENT_POSTS_COUNT in switch");
            const newUserDataDecrement = {
                ...state.user,
                posts_count: state.user.posts_count - 1,
            };
            return Object.assign({}, state, {
                user: newUserDataDecrement,
            });
            break;
        default:
            return state;
    }
};

export default userReducer;

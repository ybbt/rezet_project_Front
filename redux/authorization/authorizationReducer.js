import * as types from "../actionsTypes";

const initialAuthState = {
    signedUser: {},
    isAuth: false,
    isLoad: false,
};

const authorizationReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case types.SET_AUTH:
            return {
                ...state,
                ...{
                    signedUser: payload.signedUser,
                    isAuth: payload.isAuth,
                    isLoad: payload.isLoad,
                },
            };
            break;
        case types.LOGIN:
            return {
                ...state,
                ...{
                    isAuth: payload.isAuth,
                },
            };
            break;
        case types.LOGOUT:
            return {
                ...state,
                ...{
                    signedUser: payload.signedUser,
                    isAuth: payload.isAuth,
                },
            };
            break;
        default:
            return state;
    }
};

export default authorizationReducer;

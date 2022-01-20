import * as types from "../actionsTypes";

const initialAuthState = {
    signedUser: {},
    isAuth: false,
    isLoad: false,
};

const authorizationReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case types.SET_AUTH:
            console.log("AUTH_ME in switch");

            return Object.assign({}, state, {
                signedUser: payload.signedUser,
                isAuth: payload.isAuth,
                isLoad: payload.isLoad,
            });
            break;
        case types.LOGIN:
            console.log(payload.isAuth, "LOGIN in switch");

            return Object.assign({}, state, {
                isAuth: payload.isAuth,
            });
            break;
        case types.LOGOUT:
            console.log("LOGOUT in switch");
            return Object.assign({}, state, {
                signedUser: payload.signedUser,
                isAuth: payload.isAuth,
            });
            break;
        default:
            return state;
    }
};

export default authorizationReducer;

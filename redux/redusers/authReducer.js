import * as types from "../actionsTypes";

const initialAuthState = {
    signedUser: {},
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case types.AUTH_ME:
            console.log("AUTH_ME in switch");
            // Object.assign({}, state, {
            //     signedUser: payload.signedUser,
            // });
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

export default authReducer;

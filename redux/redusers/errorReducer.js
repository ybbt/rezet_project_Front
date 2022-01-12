import * as types from "../actionsTypes";

const initialErrorsState = {
    error: false,
    status: null,
    sttusText: null,
};

const errorReducer = (state = initialErrorsState, { type, payload }) => {
    switch (type) {
        case types.SET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                // error: payload.error,
                error: true,
                status: payload.error.status || null,
                statusText: payload.error.statusText || null,
            });
            break;
        case types.UNSET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                error: false,
            });
            break;
        default:
            return state;
    }
};

export default errorReducer;

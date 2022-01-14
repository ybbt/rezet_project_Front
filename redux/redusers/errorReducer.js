import * as types from "../actionsTypes";

const initialErrorsState = {
    error: false,
    status: null,
    statusText: null,
    errorMessage: null,
    serverResponse: null,
};

const errorReducer = (state = initialErrorsState, { type, payload }) => {
    switch (type) {
        case types.SET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                // error: payload.error,
                error: true,
                status: (payload.error && payload.error.status) || null,
                statusText: (payload.error && payload.error.statusText) || null,
                errorMessage: payload.errorMessage,
                serverResponse:
                    (payload.error && payload.error.data.message) || null,
            });
            break;
        case types.UNSET_ERROR:
            console.log("SET_ERROR in switch");
            return Object.assign({}, state, {
                error: false,
                status: null,
                statusText: null,
                errorMessage: null,
                serverResponse: null,
            });
            break;
        default:
            return state;
    }
};

export default errorReducer;

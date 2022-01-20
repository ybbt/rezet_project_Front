import * as types from "../actionsTypes";

const initialErrorsState = {
    error: false,
    status: null,
    statusText: null,
    errorMessage: null,
    serverResponse: null,
    errorDate: null,
};

import { DateTime } from "luxon";

const errorReducer = (state = initialErrorsState, { type, payload }) => {
    switch (type) {
        case types.SET_ERROR:
            return {
                ...state,
                ...{
                    // error: payload.error,
                    error: true,
                    status: (payload.error && payload.error.status) || null,
                    statusText:
                        (payload.error && payload.error.statusText) || null,
                    errorMessage: payload.errorMessage,
                    serverResponse:
                        (payload.error && payload.error.data.message) || null,
                    errorDate: DateTime.now().toMillis(),
                },
            };
            break;
        case types.UNSET_ERROR:
            return {
                ...state,
                ...{
                    error: false,
                    status: null,
                    statusText: null,
                    errorMessage: null,
                    serverResponse: null,
                },
            };
            break;
        default:
            return state;
    }
};

export default errorReducer;

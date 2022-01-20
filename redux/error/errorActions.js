// import { getUser } from "../../libs/userService";

import * as types from "../actionsTypes";

export const setError = (errorResponse, errorMessage) => ({
    type: types.SET_ERROR,
    payload: {
        error: errorResponse || null,
        errorMessage: errorMessage || null,
    },
});

export const clearError = () => ({
    type: types.UNSET_ERROR,
});

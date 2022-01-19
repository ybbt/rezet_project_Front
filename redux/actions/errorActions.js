// import { getUser } from "../../libs/userService";

import * as types from "../actionsTypes";

export const setErrorRedux =
    (errorResponse, errorMessage) => async (dispatch) => {
        console.log("setErrorRedux in action before fetch");

        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: errorResponse || null,
                errorMessage: errorMessage || null,
            },
        });
    };

export const clearErrorRedux = (userName) => async (dispatch) => {
    console.log("clearErrorRedux in action before fetch");

    dispatch({
        type: types.UNSET_ERROR,
    });
};

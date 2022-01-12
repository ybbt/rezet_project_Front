// import { getUser } from "../../libs/userService";

import * as types from "../actionsTypes";

export const setErrorRedux = (userName) => async (dispatch) => {
    console.log("setErrorRedux in action before fetch");

    dispatch({
        type: types.SET_ERROR,
        payload: { error: error.message && error.response },
    });
};

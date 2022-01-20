import { getUserService } from "../../libs/userService";

import * as types from "../actionsTypes";

import { setError } from "../error/errorActions";

export const getUserAsync = (userName) => async (dispatch) => {
    try {
        const response = await getUserService(userName);
        // throw new Error("NOT!");
        dispatch(setUser(response.data.data));
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const setUser = (user) => ({
    type: types.SET_USER,
    payload: { user },
});

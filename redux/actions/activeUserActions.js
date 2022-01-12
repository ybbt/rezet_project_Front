import { getUser } from "../../libs/userService";

import * as types from "../actionsTypes";

export const setUserRedux = (userName) => async (dispatch) => {
    console.log("setUserRedux in action before fetch");
    try {
        const response = await getUser(userName);
        dispatch({
            type: types.SET_USER,
            payload: { user: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

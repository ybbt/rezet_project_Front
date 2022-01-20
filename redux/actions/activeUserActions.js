import { getUserService } from "../../libs/userService";

import * as types from "../actionsTypes";

export const getUserAsync = (userName) => async (dispatch) => {
    console.log("setUserRedux in action before fetch");
    try {
        const response = await getUserService(userName);
        dispatch(
            setUser(response.data.data)
            /* {
            type: types.SET_USER,
            payload: { user: response.data.data },
        } */
        );
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

const setUser = (user) => ({
    type: types.SET_USER,
    payload: { user },
});

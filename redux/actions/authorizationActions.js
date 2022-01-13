import {
    fetchAuth,
    fetchSignUp,
    fetchSignIn,
    fetchSignOut,
} from "../../libs/authorizeService";

import * as types from "../actionsTypes";

import Cookies from "js-cookie";

import Router from "next/router";

export const authMeRedux = () => async (dispatch) => {
    console.log("authMe in action before fetch");
    try {
        const response = await fetchAuth();
        dispatch({
            type: types.AUTH_ME,
            payload: {
                signedUser: response.data.data,
                isAuth: true,
                isLoad: true,
            },
        });
    } catch (error) {
        console.log("authMe in action Error");
        dispatch({
            type: types.AUTH_ME,
            payload: {
                signedUser: {},
                isAuth: false,
                isLoad: true,
            },
        });
        Cookies.remove("token_mytweeter");
    }
};

export const registerRedux =
    (firstName, lastName, userName, email, password, passwordConfirmation) =>
    async (dispatch) => {
        console.log("registrRedux in action before fetch");
        try {
            const result = await fetchSignUp(
                firstName,
                lastName,
                userName,
                email,
                password,
                passwordConfirmation
            );
            const response = result.data;
            Cookies.set("token_mytweeter", response.token, {
                secure: true,
            });
            // Router.push("/");
            dispatch({
                type: types.LOGIN,
                payload: { isAuth: true },
            });
        } catch (error) {
            // message.error(`${error.response}`);
            console.log(error, "error in logoutRedux");
            dispatch({
                type: types.SET_ERROR,
                payload: { error: error.message && error.response },
            });
        }
    };

export const loginRedux = (login, password) => async (dispatch) => {
    console.log("loginRedux in action before fetch");
    try {
        const result = await fetchSignIn(login, password);
        const response = result.data;
        Cookies.set("token_mytweeter", response.token, {
            secure: true,
        });
        // Router.push("/");
        dispatch({
            type: types.LOGIN,
            payload: { isAuth: true },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error, "error in logoutRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const logoutRedux = () => async (dispatch) => {
    console.log("logout in action before fetch");
    try {
        const response = await fetchSignOut();
        dispatch({
            type: types.LOGOUT,
            payload: {
                signedUser: {},
                isAuth: false,
            },
        });
        Cookies.remove("token_mytweeter");
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error, "error in logoutRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

// export const setLoad = (value) => ({
//     type: types.SET_LOADED,
//     payload: {
//         isLoad: value,
//     },
// });

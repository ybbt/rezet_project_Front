import {
    fetchAuthService,
    fetchSignUpService,
    fetchSignInService,
    fetchSignOutService,
} from "../../libs/authorizeService";

import * as types from "../actionsTypes";

import Cookies from "js-cookie";

import Router from "next/router";

export const getAuthAsync = () => async (dispatch) => {
    console.log("authMe in action before fetch");
    try {
        const response = await fetchAuthService();
        dispatch(
            setAuth(response.data.data, true, true)
            /*  {
            type: types.SET_AUTH,
            payload: {
                signedUser: response.data.data,
                isAuth: true,
                isLoad: true,
            },
        } */
        );
    } catch (error) {
        console.log("authMe in action Error");
        dispatch(
            setAuth({}, false, true)
            /* {
            type: types.SET_AUTH,
            payload: {
                signedUser: {},
                isAuth: false,
                isLoad: true,
            },
        } */
        );
        if (error.response && error.response.status === 401) {
            Cookies.remove("token_mytweeter");
        } else {
            console.log(error.response.data.errors, "error in auth");
            dispatch({
                type: types.SET_ERROR,
                payload: {
                    error: error.response || null,
                    errorMessage: error.message || null,
                },
            });
        }
    }
};

const setAuth = (signedUser, isAuth, isLoad) => ({
    type: types.SET_AUTH,
    payload: {
        signedUser,
        isAuth,
        isLoad,
    },
});

export const registerAsync =
    (
        firstName,
        lastName,
        userName,
        email,
        password,
        passwordConfirmation,
        resetForm
    ) =>
    async (dispatch) => {
        console.log("registrRedux in action before fetch");
        try {
            const result = await fetchSignUpService(
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
            dispatch(
                setLogin(true)
                /* {
                type: types.LOGIN,
                payload: { isAuth: true },
            } */
            );
        } catch (error) {
            // message.error(`${error.response}`);
            console.log(error, "error in logoutRedux");
            dispatch({
                type: types.SET_ERROR,
                payload: {
                    error: error.response || null,
                    errorMessage: error.message || null,
                },
            });
            resetForm();
        }
    };

export const loginAsync = (login, password, resetForm) => async (dispatch) => {
    console.log("loginRedux in action before fetch");
    try {
        const result = await fetchSignInService(login, password);
        const response = result.data;
        Cookies.set("token_mytweeter", response.token, {
            secure: true,
        });
        // Router.push("/");
        console.log(response.token, "result in loginAsync");
        dispatch(
            setLogin(true)
            /* {
            type: types.LOGIN,
            payload: { isAuth: true },
        } */
        );
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.response.data.errors, "error in logoutRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
        resetForm();
    }
};

const setLogin = (isAuth) => ({
    type: types.LOGIN,
    payload: { isAuth },
});

export const logoutAsync = () => async (dispatch) => {
    console.log("logout in action before fetch");
    try {
        const response = await fetchSignOutService();
        dispatch(
            setLogout()
            /*         {
            type: types.LOGOUT,
            payload: {
                signedUser: {},
                isAuth: false,
            },
        } */
        );
        Cookies.remove("token_mytweeter");
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error, "error in logoutRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

const setLogout = () => ({
    type: types.LOGOUT,
    payload: {
        signedUser: {},
        isAuth: false,
    },
});

// export const setLoad = (value) => ({
//     type: types.SET_LOADED,
//     payload: {
//         isLoad: value,
//     },
// });

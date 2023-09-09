import {
    fetchAuthService,
    fetchSignUpService,
    fetchSignInService,
    fetchSignOutService,
} from "../../libs/authorizeService";

import * as types from "../actionsTypes";

import { setError } from "../error/errorActions";

import Cookies from "js-cookie";

export const getAuthAsync = () => async (dispatch) => {
    try {
        const response = await fetchAuthService();
        dispatch(setAuth(response.data.data, true, true));
    } catch (error) {
        dispatch(setAuth({}, false, true));
        if (error.response && error.response.status === 401) {
            Cookies.remove("token_mytweeter");
        } else {
            dispatch(setError(error.response || null, error.message || null));
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

            dispatch(setLogin(true));
        } catch (error) {
            dispatch(setError(error.response || null, error.message || null));
            resetForm();
        }
    };

export const loginAsync = (login, password, resetForm) => async (dispatch) => {
    try {
        const result = await fetchSignInService(login, password);
        const response = result.data;
        Cookies.set("token_mytweeter", response.token, {
            secure: true,
        });

        dispatch(setLogin(true));
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
        resetForm();
    }
};

const setLogin = (isAuth) => ({
    type: types.LOGIN,
    payload: { isAuth },
});

export const logoutAsync = () => async (dispatch) => {
    try {
        const response = await fetchSignOutService();
        dispatch(setLogout());
        Cookies.remove("token_mytweeter");
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const setLogout = () => ({
    type: types.LOGOUT,
    payload: {
        signedUser: {},
        isAuth: false,
    },
});

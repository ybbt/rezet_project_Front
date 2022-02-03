import {
    fetchAuth,
    fetchSignUp,
    fetchSignIn,
    fetchSignOut,
} from "../../libs/authorizeService";

import { setAuth, setLogin, setLogout } from "../slices/authSlice"; // --- для використаання slice

import * as types from "../actionsTypes";

import Cookies from "js-cookie";

import Router from "next/router";

export const authMeRedux = () => async (dispatch) => {
    console.log("authMe in action before fetch");
    try {
        const response = await fetchAuth();

        dispatch(
            setAuth({
                signedUser: response.data.data,
                isAuth: true,
                isLoad: true,
            })
        );
        // );
    } catch (error) {
        console.log(error, "authMe in action Error");

        dispatch(
            setAuth({
                signedUser: {},
                isAuth: false,
                isLoad: true,
            })
        );
        if (error.response && error.response.status === 401) {
            Cookies.remove("token_mytweeter");
        }
    }
};

export const registerRedux =
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

            dispatch(setLogin({ isAuth: true }));
        } catch (error) {
            console.log(error.request, "error in registerRedux");
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

export const loginRedux = (login, password, resetForm) => async (dispatch) => {
    console.log("loginRedux in action before fetch");
    try {
        const result = await fetchSignIn(login, password);
        const response = result.data;
        Cookies.set("token_mytweeter", response.token, {
            secure: true,
        });

        dispatch(setLogin({ isAuth: true }));
    } catch (error) {
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

export const logoutRedux = () => async (dispatch) => {
    console.log("logout in action before fetch");
    try {
        const response = await fetchSignOut();

        console.log("before dispatch in logoutRedux");
        dispatch(
            setLogout({
                signedUser: {},
                isAuth: false,
            })
        );
        Cookies.remove("token_mytweeter");
    } catch (error) {
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

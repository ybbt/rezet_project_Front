import axiosConfigured from "../libs/axiosInstance";
import { AUTHORIZE_ROUTES } from "../libs/routes";

export const fetchSignUp = (
    first_name,
    last_name,
    name,
    email,
    password,
    password_confirmation
) => {
    return axiosConfigured.post(AUTHORIZE_ROUTES.SIGN_UP, {
        first_name,
        last_name,
        name,
        email,
        password,
        password_confirmation,
    });
};

export const fetchSignIn = (login, password) => {
    return axiosConfigured.post(AUTHORIZE_ROUTES.SIGN_IN, { login, password });
};

export const fetchSignOut = () => {
    return axiosConfigured.post(AUTHORIZE_ROUTES.SIGN_OUT);
};

export const fetchAuth = () => {
    return axiosConfigured.get(AUTHORIZE_ROUTES.AUTH_ME);
};

import axiosConfigured from "../libs/axiosInstance";
import { AUTHORIZE_ROUTES } from "../libs/routes";

export const fetchSignUpService = (
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

export const fetchSignInService = (login, password) => {
    return axiosConfigured.post(AUTHORIZE_ROUTES.SIGN_IN, { login, password });
};

export const fetchSignOutService = () => {
    return axiosConfigured.post(AUTHORIZE_ROUTES.SIGN_OUT);
};

export const fetchAuthService = () => {
    return axiosConfigured.get(AUTHORIZE_ROUTES.AUTH_ME);
};

import axiosConfigured from "../libs/axiosInstance";
import { USER_ROUTES } from "../libs/routes";

export const getUser = (userName) => {
    return axiosConfigured.get(USER_ROUTES.GET_USER(userName));
};

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

axiosInstance.setToken = (token) => {
    // console.log(axiosInstance, "this in setToken");
    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers = {
                ...config.headers,
                Authorization: token ? `Bearer ${token}` : "",
            };
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );
    console.log(axiosInstance, "this in setToken");
};

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            Authorization: Cookies.get("token_mytweeter")
                ? `Bearer ${Cookies.get("token_mytweeter")}`
                : "",
            // Accept: "application/json",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;

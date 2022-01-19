import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            Authorization: Cookies.get("token_mytweeter")
                ? `Bearer ${Cookies.get("token_mytweeter")}`
                : "",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;

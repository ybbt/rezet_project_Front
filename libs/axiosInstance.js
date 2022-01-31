import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

let tokenServ = null;

axiosInstance.setToken = (token) => {
    console.log(axiosInstance, token, "this & token in setToken");
    // tokenServ = token;
    // axiosInstance.interceptors.request.use(
    //     (config) => {
    //         console.log("INTERCEPTOR");
    //         config.headers = {
    //             ...config.headers,
    //             ...{ Authorization: token ? `Bearer ${token}` : "" },
    //         };
    //         return config;
    //     },
    //     (error) => {
    //         Promise.reject(error);
    //     }
    // );
    console.log(axiosInstance, "this in setToken");
};

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(tokenServ, "first INTERceptor");
        config.headers = {
            ...config.headers,
            Authorization: Cookies.get("token_mytweeter")
                ? `Bearer ${Cookies.get("token_mytweeter")}`
                : `Bearer ${tokenServ}`,
            // Accept: "application/json",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

// let tokenServ = null;

axiosInstance.setToken = function (token) {
    // axiosInstance.defaults.headers.common["authorization"] = `Bearer ${token}`;
    this.token = token;
};

axiosInstance.interceptors.request.use(
    (config) => {
        // try {
        //     if (Cookies.get("token_mytweeter")) {
        //         config.headers = {
        //             ...config.headers,
        //             Authorization: !!Cookies.get("token_mytweeter")
        //                 ? `Bearer ${Cookies.get("token_mytweeter")}`
        //                 : `Bearer  `,
        //             Accept: "application/json",
        //         };
        //         console.log(axiosInstance, "axiosInstance in INTERceptor");
        //     }
        //     return config;
        // } catch (error) {
        //     console.log(error, "error in interceptors");
        //     return config;
        // }
        try {
            // console.log(axiosInstance.token, "axiosInstance.token");
            config.headers = {
                ...config.headers,
                Authorization: axiosInstance.token
                    ? `Bearer ${axiosInstance.token}`
                    : `Bearer ${Cookies.get("token_mytweeter")}`,
            };
        } catch (error) {
            console.log(error, "error in interceptors");
        }
        return config;
    },
    (error) => {
        console.log(error, "error in axiosInstance END");
        Promise.reject(error);
    }
);

export default axiosInstance;

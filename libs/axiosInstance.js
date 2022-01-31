import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

// let tokenServ = null;

axiosInstance.setToken = (token) => {
    axiosInstance.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(Cookies.get("token_mytweeter"), "Cookies INTERceptor");
        try {
            if (Cookies.get("token_mytweeter")) {
                config.headers = {
                    ...config.headers,
                    Authorization: !!Cookies.get("token_mytweeter")
                        ? `Bearer ${Cookies.get("token_mytweeter")}`
                        : `Bearer  `,
                    Accept: "application/json",
                };
                console.log(axiosInstance, "axiosInstance in INTERceptor");
            }
            return config;
        } catch (error) {
            console.log(error, "error in interceptors");
            return config;
        }
        // config.headers = {
        //     ...config.headers,
        //     Authorization: Cookies.get("token_mytweeter")
        //         ? `Bearer ${Cookies.get("token_mytweeter")}`
        //         : `Bearer ${/* tokenServ &&  */ ""}`,
        //     // Accept: "application/json",
        // };
        // return config;
    },
    (error) => {
        console.log(error, "error in axiosInstance END");
        Promise.reject(error);
    }
);

export default axiosInstance;

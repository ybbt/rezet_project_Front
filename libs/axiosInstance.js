import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
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

// const axiosInstanceBackend = axios.create({
//     baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
// });

export default axiosInstance;

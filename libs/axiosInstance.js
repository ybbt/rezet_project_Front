import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_SERV_URL}/api`,
    // baseURL: `http://127.0.0.1:8000/api`,
});

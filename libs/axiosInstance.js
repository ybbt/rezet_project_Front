import axios from "axios";

export default axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERV_URL}/api`,
});

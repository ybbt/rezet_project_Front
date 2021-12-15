// import styles from "../styles/Home.module.css";
import { useState } from "react";
// import axios from "axios";
import axiosInstance from "../libs/axiosInstance";
import Cookies from "js-cookie";

// const API_URL = "http://localhost:8000/api/";

export default function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    // let login_token = null;

    const handleSubmit = async (e) => {
        // alert(document.cookie);
        e.preventDefault();

        const headers = {
            "Content-Type": `multipart/form-data`,
        };

        const data = new FormData();
        data.append("username", username);
        data.append("password", password);

        const result = await axiosInstance({
            method: "post",
            url: "login",
            // baseURL: API_URL,
            data: data,
            headers: headers,
        });

        const response = result.data;

        if (response["success"]) {
            console.log("Login Successful"); // *************************************

            const login_token = response["token"];
            Cookies.set("token_mytweeter", login_token, { secure: true });
        } else {
            console.log("Failed to Login");
        }
        // alert(document.cookie);
    };

    const get_user = async () => {
        // alert(document.cookie);
        const login_token = Cookies.get("token_mytweeter");
        if (login_token) {
            // setCookie("token", login_token, { expires: 36000 });
            // console.log(Cookies, "Cookies");

            const headers = {
                Authorization: `Bearer ${login_token}`,
            };

            const result = await axiosInstance({
                method: "get",
                url: "auth-user",
                // baseURL: API_URL,
                data: JSON.stringify({}),
                headers: headers,
            });

            const response = result.data;

            console.log("get_user", response);

            // alert(document.cookie);
        } else {
            console.log("Login Token is empty");
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} action="" method="post">
            <div>
                <label htmlFor="">Username</label>
                <br />
                <input
                    onInput={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    value={username}
                />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <br />
                <input
                    onInput={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    value={password}
                />
            </div>
            <div>
                <input type="submit" value="Login" />
                <button onClick={get_user} type="button">
                    Get User
                </button>
            </div>
        </form>
    );
}

// function parseCookie(str) {
//     return str
//         .split(";")
//         .map((v) => v.split("="))
//         .reduce((acc, v) => {
//             acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
//                 v[1].trim()
//             );
//             return acc;
//         }, {});
// }

// export async function getServerSideProps(ctx) {
//     const { req, res } = ctx;
//     const cookies = parseCookie(req.headers.cookie ?? "");
//     // const mycookie = cookies[MY_COOKIE]; // mycookie exists and is set correctly

//     console.log(cookies.token_mytweeter);

//     return {
//         props: { cook: cookies.token_mytweeter },
//     };
// }

// export async function getServerSideProps /* getStaticProps */({ req }) {
//     const cookies = parseCookie(req.headers.cookie ?? "");
//     console.log(cookies.token_mytweeter, "getServerSideProps");

//     axiosInstance.interceptors.request.use((config) => {
//         config.headers.Authorization = cookies.token_mytweeter
//             ? `Bearer ${cookies.token_mytweeter}`
//             : "";
//         return config;
//     });

//     const res = await axiosInstance.get("/auth-user");

//     console.log(res, "res");

//     return {
//         props: {},
//     };
// }

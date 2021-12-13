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

        let data = new FormData();
        data.append("username", username);
        data.append("password", password);

        let result = await axiosInstance({
            method: "post",
            url: "login-verify",
            // baseURL: API_URL,
            data: data,
            headers: headers,
        });

        let response = result.data;

        if (response["success"]) {
            console.log("Login Successful");
            const login_token = response["token"];
            Cookies.set("token_mytweeter", login_token, { secure: true });
        } else {
            console.log("Failed to Login");
        }
        // alert(document.cookie);
    };

    // ******************************
    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    // ******************************

    const get_user = async () => {
        // alert(document.cookie);
        const login_token = Cookies.get("token_mytweeter");
        if (login_token) {
            // setCookie("token", login_token, { expires: 36000 });
            // console.log(Cookies, "Cookies");

            const headers = {
                Authorization: `Bearer ${login_token}`,
            };

            let result = await axiosInstance({
                method: "get",
                url: "auth-user",
                // baseURL: API_URL,
                data: JSON.stringify({}),
                headers: headers,
            });

            let response = result.data;

            console.log("get_user", response);

            // alert(document.cookie);
        } else {
            console.log("Login Token is empty");
        }
    };

    return (
        // <div className={styles.container}>
        //     <div className={styles['m-inner']}>
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
        //     </div>
        // </div>
    );
}

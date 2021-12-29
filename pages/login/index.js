import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signinSchema } from "../../schemas/signinSchema";

import Cookies from "js-cookie";

import Router from "next/router";
// import classNames from "classnames";
import Link from "next/link";

import axiosInstance from "../../libs/axiosInstance";
import SignInUp from "../../components/SignInUp";
import AuthorizationElement from "../../components/AuthorizationElement";

export default function Login(errors, touched) {
    async function handleSubmitData({ login, password } /* , { resetForm } */) {
        // console.log("in login");
        try {
            const result = await axiosInstance.post("/login", {
                login: login,
                // email,
                password,
                // headers: {
                //     Authorization: "",
                // },
            });

            const response = result.data;

            console.log(result, "response result");

            if (response.error) {
                console.log(response.error, "response error");
                message.error(`${response.error}`);
            } else {
                Cookies.set("token_mytweeter", response.token, {
                    secure: true,
                });
                // resetForm();
                Router.push("/");
            }
        } catch (error) {
            message.error(`${error}`);
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignInUp title="Sign in">
                <Formik
                    initialValues={{
                        login: "",
                        // email: "",
                        password: "",
                    }}
                    validationSchema={signinSchema}
                    onSubmit={handleSubmitData}
                >
                    <Form>
                        <div className="flex flex-col">
                            <AuthorizationElement
                                formName="login"
                                title="User name (email)"
                            />
                            {/* <AuthorizationElement formName="email" title="Email" /> */}
                            <AuthorizationElement
                                formName="password"
                                title="Password"
                                type="password"
                            />
                            <button
                                type="submit"
                                className="bg-[#54C1FF] text-white mt-11 h-7"
                            >
                                Sign in
                            </button>
                            <div className="flex justify-center">
                                <Link href="/register">
                                    <a className="text-xs text-[#54C1FF] mb-3 mt-3">
                                        Sign up
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </SignInUp>
        </div>
    );
}

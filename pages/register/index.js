import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signupSchema } from "../../schemas/signupSchema";

import Cookies from "js-cookie";

import Router from "next/router";
// import classNames from "classnames";
import Link from "next/link";

import axiosInstance from "../../libs/axiosInstance";
import SignInUp from "../../components/SignInUp";
import AuthorizationElement from "../../components/AuthorizationElement";

export default function Register({ errors, touched }) {
    async function handleSubmitData(
        { userName, email, password } /* ,
        { resetForm } */
    ) {
        try {
            const result = await axiosInstance.post("/register", {
                name: userName,
                email,
                password,
            });

            const response = result.data;

            // console.log(response.token); // *****************************************

            if (response.error) {
                console.log(response.error);
            } else {
                Cookies.set("token_mytweeter", response.token, {
                    secure: true,
                });
                // resetForm();
                Router.push("/");
            }
        } catch (error) {
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignInUp title="Sign up">
                <Formik
                    initialValues={{
                        userName: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmitData}
                >
                    <Form>
                        <div className="flex flex-col">
                            <AuthorizationElement
                                formName="userName"
                                title="User name"
                            />
                            <AuthorizationElement
                                formName="email"
                                title="Email"
                            />
                            <AuthorizationElement
                                formName="password"
                                title="Password"
                                type="password"
                            />
                            <button
                                type="submit"
                                className="bg-[#54C1FF] text-white mt-11 h-7"
                            >
                                Sign up
                            </button>
                            <div className="flex justify-center">
                                <Link href="/login">
                                    <a className="text-xs text-[#54C1FF] mb-3 mt-3">
                                        Sign in
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

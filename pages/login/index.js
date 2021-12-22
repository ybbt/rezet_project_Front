import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Cookies from "js-cookie";

import Router from "next/router";
// import classNames from "classnames";
import Link from "next/link";

import axiosInstance from "../../libs/axiosInstance";
import SignInUp from "../../components/SignInUp";
import AuthorizationElement from "../../components/AuthorizationElement";

const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        // .min(2, "Too Short!")
        // .max(20, "Too Long!")
        .required("Required"),
    // email: Yup.string()
    //     .email("Invalid email")
    //     .required("Required")
    //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Failed!"),
    password: Yup.string().required("No password provided."),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/^\d+$/, "Password can only contain numbers from 1 to 9."),
});

export default function Register() {
    async function handleSubmitData(
        { userName, /*email, */ password },
        { resetForm }
    ) {
        try {
            const result = await axiosInstance.post("/login", {
                name: userName,
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
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response, "catch error");
        }
    }

    function madeForm({ errors, touched }) {
        return (
            <>
                <Form>
                    <div className="flex flex-col">
                        <AuthorizationElement
                            formName="userName"
                            title="User name"
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
            </>
        );
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignInUp title="Sign in">
                <Formik
                    initialValues={{
                        userName: "",
                        // email: "",
                        password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmitData}
                >
                    {madeForm}
                </Formik>
            </SignInUp>
        </div>
    );
}

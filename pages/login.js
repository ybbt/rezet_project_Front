import { Alert, message } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signinSchema } from "../schemas/signinSchema";

import Cookies from "js-cookie";

import Router from "next/router";

import Link from "next/link";

import SignInUp from "../components/SignInUp";
import AuthorizationElement from "../components/AuthorizationElement";
import { fetchSignIn } from "../libs/authorizeService";

export default function Login(errors, touched) {
    async function handleSubmitData({ login, password }, { resetForm }) {
        try {
            const result = await fetchSignIn(login, password);

            const response = result.data;

            console.log(result, "response result");

            Cookies.set("token_mytweeter", response.token, {
                secure: true,
            });
            Router.push("/");
        } catch (error) {
            message.error(`${error.response.data.errors[0]}`);
            console.log(error.response.data.errors[0], "error catch");
            resetForm();
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignInUp title="Sign in">
                <Formik
                    initialValues={{
                        login: "",

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

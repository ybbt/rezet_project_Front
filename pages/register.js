import { Alert, message } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signupSchema } from "../schemas/signupSchema";

import Cookies from "js-cookie";

import Router from "next/router";

import Link from "next/link";

import SignInUp from "../components/SignInUp";
import AuthorizationElement from "../components/AuthorizationElement";
import { fetchSignUp } from "../libs/authorizeService";

export default function Register() {
    async function handleSubmitData(
        {
            firstName,
            lastName,
            userName,
            email,
            password,
            passwordConfirmation,
        },
        { resetForm }
    ) {
        try {
            const result = await fetchSignUp(
                firstName,
                lastName,
                userName,
                email,
                password,
                passwordConfirmation
            );

            const response = result.data;

            Cookies.set("token_mytweeter", response.token, {
                secure: true,
            });
            Router.push("/");
        } catch (error) {
            message.error(`${error.response.data.message}`);
            console.log(error.response.data.message, "error");
            resetForm();
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignInUp title="Sign up">
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        userName: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                    }}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmitData}
                >
                    <Form>
                        <div className="flex flex-col">
                            <AuthorizationElement
                                formName="firstName"
                                title="First name"
                            />
                            <AuthorizationElement
                                formName="lastName"
                                title="Last name"
                            />
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
                            <AuthorizationElement
                                formName="passwordConfirmation"
                                title="Password confirmation"
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

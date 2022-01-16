import { useEffect } from "react";

import { Alert, Input /* , message  */ } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signupSchema } from "../schemas/signupSchema";

import Router from "next/router";

import Link from "next/link";

import SignInUpLayout from "../components/SignInUpLayout";
import AuthorizationElement from "../components/AuthorizationElement";

import { useDispatch } from "react-redux";

import { registerRedux } from "../redux/actions/authorizationActions.js";

export default function Register() {
    const dispatch = useDispatch();

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
        dispatch(
            registerRedux(
                firstName,
                lastName,
                userName,
                email,
                password,
                passwordConfirmation,
                resetForm
            )
        );
    }

    return (
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
                    <AuthorizationElement formName="email" title="Email" />
                    <AuthorizationElement
                        formName="password"
                        title="Password"
                        type="assword"
                        as={Input.Password}
                    />
                    <AuthorizationElement
                        formName="passwordConfirmation"
                        title="Password confirmation"
                        type="password"
                        as={Input.Password}
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
    );
}

Register.getLayout = function getLayout(page) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignInUpLayout>{page}</SignInUpLayout>
        </div>
    );
};

import { useEffect } from "react";

import { Alert, message } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signupSchema } from "../schemas/signupSchema";

import Router from "next/router";

import Link from "next/link";

import SignInUp from "../components/SignInUp";
import AuthorizationElement from "../components/AuthorizationElement";

import { useSelector, useDispatch } from "react-redux";

import {
    authMeRedux,
    registerRedux,
} from "../redux/actions/authorizationActions.js";

import useAuthStatus from "../hooks/useAuthStatus";

import useErrorStore from "../hooks/useErrorStore";

export default function Register() {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const isLoadStore = useSelector((state) => state.authReducer.isLoad);
    const dispatch = useDispatch();

    // const stateInStore = useSelector((state) => state);
    // console.log(stateInStore, "state in login");

    useAuthStatus();

    useEffect(() => {
        if (isAuthStore) {
            Router.push("/");
        }
    }, [isAuthStore]);

    useErrorStore();

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

    if (!isLoadStore || isAuthStore) {
        return (
            <div className="flex items-center justify-center space-x-2 animate-bounce h-screen">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
            </div>
        );
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

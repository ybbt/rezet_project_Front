import { useEffect } from "react";

import { Alert, message /* , Spin */ } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signinSchema } from "../schemas/signinSchema";

import Router from "next/router";

import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";

import SignInUp from "../components/SignInUp";
import AuthorizationElement from "../components/AuthorizationElement";
import {
    authMeRedux,
    loginRedux,
} from "../redux/actions/authorizationActions.js";

import useAuthStatus from "../hooks/useAuthStatus";

import useErrorStore from "../hooks/useErrorStore";

export default function Login(errors, touched) {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const isLoadStore = useSelector((state) => state.authReducer.isLoad);
    const dispatch = useDispatch();

    // const {
    //     error: errorStore,
    //     errorMessage: errorMessageStore,
    //     serverResponse: serverResponseStore,
    // } = useSelector((state) => state.errorReducer);

    // const stateInStore = useSelector((state) => state);
    // console.log(stateInStore, "state in login");

    useAuthStatus();

    useEffect(() => {
        if (isAuthStore) {
            Router.push("/");
        }
    }, [isAuthStore]);

    // useEffect(() => {
    //     errorStore &&
    //         message.error(`${serverResponseStore || errorMessageStore}`);
    //     console.log(errorStore, "errorStore in useEffect");
    // }, [errorStore]);

    useErrorStore();

    async function handleSubmitData({ login, password }, { resetForm }) {
        dispatch(loginRedux(login, password, resetForm));
    }

    if (!isLoadStore || isAuthStore) {
        return (
            // <div className="w-full flex justify-center h-screen">
            //     <Spin size="large" />;
            // </div>

            <div className="flex items-center justify-center space-x-2 animate-bounce h-screen">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full "></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
            </div>

            // <div class=" flex justify-center items-center">
            //     <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            // </div>
        );
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

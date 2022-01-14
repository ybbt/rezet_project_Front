import { useEffect } from "react";

import { Alert /* , message */ /* , Spin */ } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signinSchema } from "../schemas/signinSchema";

import Router from "next/router";

import Link from "next/link";

import { useDispatch } from "react-redux";

import SignInUpLayout from "../components/SignInUpLayout";
import AuthorizationElement from "../components/AuthorizationElement";
import { loginRedux } from "../redux/actions/authorizationActions.js";

export default function Login(errors, touched) {
    const dispatch = useDispatch();

    async function handleSubmitData({ login, password }, { resetForm }) {
        dispatch(loginRedux(login, password, resetForm));
    }

    return (
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
    );
}

Login.getLayout = function getLayout(page) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignInUpLayout>{page}</SignInUpLayout>
        </div>
    );
};

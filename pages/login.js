import { Alert, message } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signinSchema } from "../schemas/signinSchema";

import Cookies from "js-cookie";

import Router from "next/router";

import Link from "next/link";

import SignLayout from "../components/SignLayout";
import AuthorizationElement from "../components/AuthorizationElement";
import { fetchSignIn } from "../libs/authorizeService";

import { useContext } from "react";
import signedUserContext from "../context/signedUserContext";

export default function Login(errors, touched) {
    const [auth, setAuth] = useContext(signedUserContext);
    const { isLoaded } = auth;

    async function handleSubmitData({ login, password }, { resetForm }) {
        try {
            const result = await fetchSignIn(login, password);

            const response = result.data;

            console.log(result, "response result");

            Cookies.set("token_mytweeter", response.token, {
                secure: true,
            });

            setAuth({
                ...auth,
                ...{ isLoaded: false },
            });

            Router.push("/");
        } catch (error) {
            message.error(`${error.response.data.errors[0]}`);
            console.log(error.response.data.errors[0], "error catch");
            resetForm();
        }
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
        <div className="w-full h-screen flex justify-center items-center ">
            <SignLayout title="Sign in">{page}</SignLayout>
        </div>
    );
};

import { Alert, message } from "antd";
import "antd/dist/antd.css";

import { Formik, Form } from "formik";
import { signupSchema } from "../schemas/signupSchema";

import Cookies from "js-cookie";

import Router from "next/router";

import Link from "next/link";

import SignLayout from "../components/SignLayout";
import AuthorizationElement from "../components/AuthorizationElement";
import { fetchSignUp } from "../libs/authorizeService";

import { useContext } from "react";
import signedUserContext from "../context/signedUserContext";

export default function Register() {
    const [auth, setAuth] = useContext(signedUserContext);

    const { isLoaded } = auth;

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

            setAuth({
                ...auth,
                ...{ isLoaded: false },
            });

            Router.push("/");
        } catch (error) {
            message.error(`${error.response.data.message}`);
            console.log(error.response.data.message, "error");
            resetForm();
        }
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
    );
}

Register.getLayout = function getLayout(page) {
    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <SignLayout title="Sign up">{page}</SignLayout>
        </div>
    );
};

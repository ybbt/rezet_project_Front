import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Cookies from "js-cookie";

import Router from "next/router";
import classNames from "classnames";

import axiosInstance from "../libs/axiosInstance";

const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Failed!"),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/^\d+$/, "Password can only contain numbers from 1 to 9."),
});

export default function Register() {
    async function handleSubmitData(
        { userName, email, password },
        { resetForm }
    ) {
        // console.log(values, "values");

        try {
            const result = await axiosInstance.post("/register", {
                name: userName,
                email,
                password,
                headers: {
                    Authorization: "",
                },
            });

            const response = result.data;

            console.log(response.token); // *****************************************

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

    function madeForm({ errors, touched }) {
        const fieldStyle = classNames(
            "border-[#949494] border w-full focus-visible:outline-none focus:border focus:border-[#949494]"
        );

        return (
            <>
                <Form>
                    <div className="flex flex-col">
                        <div className="h-14">
                            <span className="text-xs">User name</span>
                            <Field name="userName" className={fieldStyle} />
                            <ErrorMessage
                                name="userName"
                                render={(msg) => (
                                    <Alert
                                        message={msg}
                                        type="error"
                                        showIcon
                                        style={{ height: "12px" }}
                                    ></Alert>
                                )}
                            />
                        </div>
                        <div className="h-14">
                            <span className="text-xs ">Email</span>
                            <Field
                                name="email"
                                type="email"
                                className={fieldStyle}
                            />
                            <ErrorMessage
                                name="email"
                                render={(msg) => (
                                    <Alert
                                        message={msg}
                                        type="error"
                                        showIcon
                                        style={{ height: "12px" }}
                                    ></Alert>
                                )}
                            />
                        </div>
                        <div className="h-14">
                            <span className="text-xs ">Email</span>
                            <Field
                                type="password"
                                name="password"
                                className={fieldStyle}
                            />
                            <ErrorMessage
                                name="password"
                                render={(msg) => (
                                    <Alert
                                        message={msg}
                                        type="error"
                                        showIcon
                                        style={{ height: "12px" }}
                                    ></Alert>
                                )}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#54C1FF] text-white mt-4"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </>
        );
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="h-[33rem] flex justify-center w-96 border-[#949494] border-2">
                <div className="w-52 flex items-center flex-col">
                    <h1 className="text-xl font-bold text-[#54C1FF]  mt-4">
                        Sign Up
                    </h1>
                    <Formik
                        initialValues={{
                            userName: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmitData}
                    >
                        {madeForm}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

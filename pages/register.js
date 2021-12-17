import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form, Field } from "formik";
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
        const fieldStyle = classNames("border-[#949494] border-2");

        //! Допрацювати
        function errorField(errors, touched, name) {
            alert();
            return (
                <>
                    {errors[name] && touched[name] && (
                        <Alert message={errors[name]} type="error" showIcon />
                    )}
                </>
            );
        }

        const errorUser = errorField(errors, touched, "userName");

        return (
            <Form>
                <div className="flex flex-col">
                    <Field name="userName" className={fieldStyle} />
                    {errorField}
                    <Field name="email" type="email" className={fieldStyle} />
                    {errors.email && touched.email ? (
                        <Alert message={errors.email} type="error" showIcon />
                    ) : null}
                    <Field
                        type="password"
                        name="password"
                        className={fieldStyle}
                    />
                    {errors.password && touched.password ? (
                        <Alert
                            message={errors.password}
                            type="error"
                            showIcon
                        />
                    ) : null}
                    <button type="submit" className="bg-[#54C1FF] text-white">
                        Submit
                    </button>
                </div>
            </Form>
        );
    }

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    userName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmitData}
            >
                {/* {({ errors, touched }) => (
                    <Form>
                        <div className="flex flex-col">
                            <Field
                                name="userName"
                                className="border-[#949494] border-2"
                            />
                            {errors.userName && touched.userName ? (
                                <Alert
                                    message={errors.userName}
                                    type="error"
                                    showIcon
                                />
                            ) : null}
                            <Field
                                name="email"
                                type="email"
                                className="border-[#949494] border-2"
                            />
                            {errors.email && touched.email ? (
                                <Alert
                                    message={errors.email}
                                    type="error"
                                    showIcon
                                />
                            ) : null}
                            <Field
                                type="password"
                                name="password"
                                className="border-[#949494] border-2"
                            />
                            {errors.password && touched.password ? (
                                <Alert
                                    message={errors.password}
                                    type="error"
                                    showIcon
                                />
                            ) : null}
                            <button
                                type="submit"
                                className="bg-[#54C1FF] text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )} */}
                {madeForm}
            </Formik>
        </div>
    );
}

import { Alert } from "antd";
import "antd/dist/antd.css";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import axiosInstance from "../libs/axiosInstance";

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
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

export default function ValidationSchemaExample() {
    async function handleSubmitData(
        { firstName, email, password },
        { resetForm }
    ) {
        // console.log(values, "values");

        try {
            const response = await axiosInstance.post("/register", {
                name: firstName,
                email,
                password,
            });

            resetForm();
        } catch (error) {
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmitData}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="firstName" />
                        {errors.firstName && touched.firstName ? (
                            <Alert
                                message={errors.firstName}
                                type="error"
                                showIcon
                            />
                        ) : null}
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? (
                            <Alert
                                message={errors.email}
                                type="error"
                                showIcon
                            />
                        ) : null}
                        <Field type="password" name="password" />
                        {errors.password && touched.password ? (
                            <Alert
                                message={errors.password}
                                type="error"
                                showIcon
                            />
                        ) : null}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

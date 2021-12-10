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
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
});

export default function ValidationSchemaExample() {
    async function handleSubmitData({ firstName, email, password }) {
        // console.log(values, "values");

        try {
            const response = await axiosInstance.post("/register", {
                name: firstName,
                email,
                password,
            });

            // setPosts([...posts, response.data.data]);
        } catch (error) {
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response);
        }
    }

    return (
        <div>
            <h1>Signup</h1>
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
                            <div>{errors.firstName}</div>
                        ) : null}
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <Field type="password" name="password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

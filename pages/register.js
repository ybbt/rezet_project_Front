import { Alert } from "antd";

// *********************** Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// ***********************

// *********************** yup
import * as Yup from "yup";
// ***************************

export default function Register() {
    function handleSave({ postContent }, { resetForm }) {
        onSave(postContent);
        resetForm();
    }

    const PostSaveSchema = Yup.object().shape({
        postContent: Yup.string().required("Required Field!"),
    });

    function madeForm({ errors, touched }) {
        const errorField = errors.postContent ? (
            <Alert message={errors.postContent} type="error" showIcon />
        ) : null;

        return (
            <Form>
                <Field as="textarea" id="postContent" name="postContent" />
                {errorField}
                <div>
                    <button type="submit">button</button>
                </div>
            </Form>
        );
    }

    return (
        <>
            <Formik
                initialValues={""}
                validateOnChange={!!editContent}
                validateOnBlur={!!editContent}
                validationSchema={PostSaveSchema}
                onSubmit={handleSave}
            >
                {madeForm}
            </Formik>
        </>
    );
}

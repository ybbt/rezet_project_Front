import { useState } from "react";

import { message } from "antd";

// *********************** Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// ***********************

// *********************** yup
import * as Yup from "yup";
// ***************************

export function EditPost({ editContent, onSave, onCancel }) {
    const initValue = editContent || "";

    const buttonCancel = editContent ? (
        <button onClick={onCancel}>Cancel</button>
    ) : null;

    const nameSaveButton = editContent ? "Save" : "Tweet";

    function handleSave({ postContent }, { resetForm }) {
        onSave(postContent);
        resetForm();
    }

    const PostSaveSchema = Yup.object().shape({
        postContent: Yup.string().required("Required Field!"),
    });

    function madeForm({ errors, touched }) {
        const errorField = errors.postContent ? (
            <div>{errors.postContent}</div>
        ) : null;

        return (
            <Form>
                <Field as="textarea" id="postContent" name="postContent" />
                {errorField}
                <div>
                    <button type="submit">{nameSaveButton}</button>
                    {buttonCancel}
                </div>
            </Form>
        );
    }

    return (
        <>
            <Formik
                initialValues={{
                    postContent: initValue,
                }}
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

import { useState } from "react";

import { Alert } from "antd";

// *********************** Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// ***********************

// *********************** yup
import * as Yup from "yup";
// ***************************

export function EditPost({ editContent, onSave, onCancel }) {
    const initValue = editContent || "";

    const buttonCancel = editContent ? (
        <button
            onClick={onCancel}
            className="text-blue-400 border-blue-400 border p-1 m-1 w-14"
        >
            Cancel
        </button>
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
            <Alert message={errors.postContent} type="error" showIcon />
        ) : null;

        return (
            <Form>
                <Field
                    as="textarea"
                    id="postContent"
                    name="postContent"
                    className="w-full"
                />
                {errorField}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-400 text-white border p-1 m-1 w-14"
                    >
                        {nameSaveButton}
                    </button>
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

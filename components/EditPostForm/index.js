import { useState } from "react";

import { Alert } from "antd";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

export function EditPostForm({ editContent, onSave, onCancel }) {
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
        postContent: Yup.string()
            .required("Required Field!")
            .max(255, "Must be at most 255 characters"),
    });

    function madeForm({ errors, touched }) {
        const errorField = errors.postContent ? (
            <Alert message={errors.postContent} type="error" showIcon />
        ) : null;

        return (
            <Form>
                <Field as="textarea" id="postContent" name="postContent" />
                <ErrorMessage
                    name="postContent"
                    render={(msg) => (
                        <Alert message={msg} type="error" showIcon />
                    )}
                />
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

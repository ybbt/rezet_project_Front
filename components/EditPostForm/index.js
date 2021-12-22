import { useState } from "react";

import { Alert } from "antd";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { postSaveSchema } from "../../schemas/postSaveSchema";

export function EditPostForm({ editContent, onSave, onCancel }) {
    const buttonCancel = editContent ? (
        <button onClick={onCancel}>Cancel</button>
    ) : null;

    const nameSaveButton = editContent ? "Save" : "Tweet";

    function handleSave({ postContent }, { resetForm }) {
        onSave(postContent);
        resetForm();
    }

    return (
        <>
            <Formik
                initialValues={{
                    postContent: editContent || "",
                }}
                validateOnChange={!!editContent}
                validateOnBlur={!!editContent}
                validationSchema={postSaveSchema}
                onSubmit={handleSave}
            >
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
            </Formik>
        </>
    );
}

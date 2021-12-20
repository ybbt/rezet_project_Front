import { useState } from "react";

import { Alert } from "antd";

// *********************** Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// ***********************

// *********************** yup
import * as Yup from "yup";
// ***************************

import classNames from "classnames";

export function EditPost({ editContent, onSave, onCancel }) {
    const initValue = editContent || "";

    const buttonCancel = editContent ? (
        <button
            onClick={onCancel}
            className="text-blue-400 border-[#54C1FF] border p-1 m-1 w-24 h-7 text-xs"
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

    const textAreaStyle = classNames(
        "w-full resize-none focus-visible:outline-none  focus:border focus:border-[#949494]",
        { "border border-[#949494]": !!editContent }
    );

    function madeForm({ errors, touched }) {
        return (
            <Form>
                <Field
                    as="textarea"
                    id="postContent"
                    name="postContent"
                    placeholder="Whats up?"
                    className={textAreaStyle}
                />
                <ErrorMessage
                    render={(msg) => (
                        <Alert message={msg} type="error" showIcon></Alert>
                    )}
                    name="postContent"
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#54C1FF] text-white border-[#54C1FF] border p-1 m-1 w-24 h-7 text-xs"
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

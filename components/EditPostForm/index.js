import { useState } from "react";

import { Alert } from "antd";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { postSaveSchema } from "../../schemas/postSaveSchema";

import classNames from "classnames";

export function EditPostForm({ editContent, onSave, onCancel }) {
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

    const textAreaStyle = classNames(
        "w-full resize-none focus-visible:outline-none  focus:border focus:border-[#949494]",
        { "border border-[#949494]": !!editContent }
    );

    return (
        <div className=" pr-2">
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
            </Formik>
        </div>
    );
}

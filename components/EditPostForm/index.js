import { useState } from "react";

import { Alert } from "antd";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { postSaveSchema } from "../../schemas/postSaveSchema";

import classNames from "classnames";

export function EditPostForm({
    editContent,
    onSave,
    onCancel,
    errors,
    touched,
}) {
    // const initValue = editContent || "";

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

    // const PostSaveSchema = Yup.object().shape({
    //     postContent: Yup.string().required("Required Field!"),
    // });

    const textAreaStyle = classNames(
        "w-full resize-none focus-visible:outline-none  focus:border focus:border-[#949494]",
        { "border border-[#949494]": !!editContent }
    );

    return (
        <div className="border border-t-0 border-[#949494] p-2">
            <Formik
                initialValues={{
                    postContent: editContent || "",
                }}
                validateOnChange={!!editContent}
                validateOnBlur={!!editContent}
                validationSchema={postSaveSchema}
                onSubmit={handleSave}
            >
                {/* {AutorizationForm} */}
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

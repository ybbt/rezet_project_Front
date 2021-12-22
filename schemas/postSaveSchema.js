import * as Yup from "yup";

const postSaveSchema = Yup.object().shape({
    postContent: Yup.string()
        .required("Required Field!")
        .max(255, "Must be at most 255 characters"),
});

export { postSaveSchema };

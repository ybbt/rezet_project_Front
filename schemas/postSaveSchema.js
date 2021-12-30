import * as Yup from "yup";

const postSaveSchema = Yup.object().shape({
    postContent: Yup.string().required("Required Field!"),
});

export { postSaveSchema };

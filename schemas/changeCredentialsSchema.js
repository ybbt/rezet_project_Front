import * as Yup from "yup";

const changeCredentialsSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(25, "Too Long!")
        .required("Required")
        .matches(/^[a-zA-Zа-яА-яїЇіЇ-]+$/, "Letters and '-'  only"),

    lastName: Yup.string()
        .max(25, "Too Long!")
        .matches(/^[a-zA-Zа-яА-яїЇіЇ-]+$/, "Letters and '-'  only"),
});

export { changeCredentialsSchema };

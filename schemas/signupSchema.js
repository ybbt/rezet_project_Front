import * as Yup from "yup";

const signupSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(25, "Too Long!")
        .required("Required")
        .matches(/^[a-zA-Zа-яА-яїЇіЇ-]+$/, "Letters and '-'  only"),

    lastName: Yup.string()
        .max(25, "Too Long!")
        .matches(/^[a-zA-Zа-яА-яїЇіЇ-]+$/, "Letters and '-'  only"),

    userName: Yup.string()
        .min(2, "Too Short!")
        .max(20, "Too Long!")
        .required("Required")
        .matches(/^[a-zA-Z0-9]+$/, "Letters and numbers only"),
    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Password can only contain Letters and numbers"
        ),
    passwordConfirmation: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Password can only contain Letters and numbers"
        )
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

export { signupSchema };

import * as Yup from "yup";

const signupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, "Too Short!")
        .max(20, "Too Long!")
        .required("Required")
        .matches(/^\d*[a-zA-Z][a-zA-Z\d]*$/, "Letters and numbers only"),
    email: Yup.string()
        .email("Invalid email")
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),

    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
            /^\d*[a-zA-Z][a-zA-Z\d]*$/,
            "Password can only contain numbers from 1 to 9."
        ),
});

export { signupSchema };

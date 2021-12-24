import * as Yup from "yup";

const signinSchema = Yup.object().shape({
    login: Yup.string()
        // .min(2, "Too Short!")
        // .max(20, "Too Long!")
        .required("Required"),
    // email: Yup.string()
    //     .email("Invalid email")
    //     .required("Required")
    //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Failed!"),
    password: Yup.string().required("No password provided."),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/^\d+$/, "Password can only contain numbers from 1 to 9."),
});

export { signinSchema };

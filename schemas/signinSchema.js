import * as Yup from "yup";

const signinSchema = Yup.object().shape({
    login: Yup.lazy((value) => {
        if (value) {
            switch (value.includes("@")) {
                case true:
<<<<<<< HEAD
                    return Yup.string()
                        .email("Invalid email")
                        .required("Required email");
                case false:
                    return Yup.string()
                        .required("Required user name")
                        .matches(
                            /^[a-zA-Z0-9]+$/,
                            "User name can only contain letters and numbers"
                        );
=======
                    return Yup.string().email("Invalid email");
                case false:
                    return Yup.string().matches(
                        /^[a-zA-Z0-9]+$/,
                        "User name can only contain letters and numbers"
                    );
>>>>>>> stage-3--stage-4_comments__with-redux-thunk___refact-redux
            }
        }
        return Yup.string().required("Required field");
    }),
    password: Yup.string()
        .required("No password provided")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Password can only contain letters and numbers"
        ),
});

export { signinSchema };

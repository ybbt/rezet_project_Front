import * as Yup from "yup";

const signinSchema = Yup.object().shape({
    login: Yup.lazy((value) => {
        if (value) {
            switch (value.includes("@")) {
                case true:
                    return Yup.string().email("Invalid email");
                case false:
                    return Yup.string().matches(
                        /^[a-zA-Z0-9]+$/,
                        "User name can only contain letters and numbers"
                    );
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

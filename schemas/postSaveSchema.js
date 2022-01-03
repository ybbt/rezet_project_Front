import * as Yup from "yup";

const signinSchema = Yup.object().shape({
    login: Yup.lazy((value) => {
        switch (value.includes("@")) {
            case true:
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
        }
    }),
    password: Yup.string()
        .required("No password provided")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Password can only contain letters and numbers"
        ),
});

export { signinSchema };

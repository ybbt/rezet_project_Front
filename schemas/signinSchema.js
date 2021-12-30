import * as Yup from "yup";

const signinSchema = Yup.object().shape({
    login: Yup.string().required("Required"),
    password: Yup.string().required("No password provided."),
});

console.log(signinSchema);

export { signinSchema };

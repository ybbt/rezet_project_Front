import { PageLayout } from "../components/PageLayout";
import "antd/dist/antd.css";
import axiosConfigured from "../libs/axiosInstance"; //! прибрати

import AuthorizationElement from "../components/AuthorizationElement";
import { Formik, Form } from "formik";

export default function Settings() {
    async function handleSubmitData({ first_name, last_name }) {
        try {
            const result = await axiosConfigured.post("/me", {
                first_name,
                last_name,
            });

            // const response = result.data;

            console.log(result, "response result");

            // Router.push("/");
            alert("submit");
        } catch (error) {
            // message.error(`${error.response.data.errors[0]}`);
            console.log(error.response, "error catch");
        }
    }

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <span>Settings</span>
            </header>
            <div className="p-5 border border-[#949494] border-t-0">
                <Formik
                    initialValues={{
                        login: "",

                        password: "",
                    }}
                    // validationSchema={signinSchema}
                    onSubmit={handleSubmitData}
                >
                    <Form>
                        <div className="flex flex-col">
                            <AuthorizationElement
                                formName="first_name"
                                title="First name"
                            />
                            <AuthorizationElement
                                formName="last_name"
                                title="Last name"
                            />
                            <button
                                type="submit"
                                className="bg-[#54C1FF] text-white h-7"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

Settings.getLayout = function getLayout(page) {
    return (
        <>
            <PageLayout>{page}</PageLayout>
        </>
    );
};

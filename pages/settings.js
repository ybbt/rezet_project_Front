import { PageLayout } from "../components/PageLayout";
import { UserWrapper } from "../components/UserWrapper";
import "antd/dist/antd.css";
import axiosConfigured from "../libs/axiosInstance"; //! прибрати

import AuthorizationElement from "../components/AuthorizationElement";
import { Formik, Form } from "formik";

import { Modal, Button } from "antd";

import { /*  useEffect,  */ useState } from "react";

import { useSelector /* , useDispatch */ } from "react-redux";

export default function Settings() {
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { signedUser: signedUserStore } = useSelector(
        (state) => state.authReducer
    );

    async function handleSubmitData({ firstName, lastName }) {
        let formData = new FormData();
        formData.append("avatar", file);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        try {
            const result = await axiosConfigured.post(
                "/me",
                formData
                //     {
                //     first_name: firstName,
                //     last_name: lastName,
                //     avatar: file,
                // }
            );

            // const response = result.data;

            console.log(result, "response result");

            // Router.push("/");
            alert("submit");
        } catch (error) {
            // message.error(`${error.response.data.errors[0]}`);
            console.log(error.response, "error catch");
        }
    }

    function handleImageChange(e) {
        console.log("handleImageChange");
        e.preventDefault();

        let formFile = e.target.files[0];

        setFile(formFile);

        // --- Для відображення превью
        let reader = new FileReader();

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };

        reader.readAsDataURL(formFile);
        // ---
    }

    // function setModalVisible(modalVisible) {
    //     setModalVisible({ modalVisible });
    // }

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <span>Settings</span>
            </header>
            <div className=" border border-[#949494] border-t-0">
                <Formik
                    initialValues={{
                        firstName: "",

                        lastName: "",
                    }}
                    // validationSchema={signinSchema}
                    onSubmit={handleSubmitData}
                >
                    <Form>
                        <div className="flex flex-col p-5">
                            <AuthorizationElement
                                formName="firstName"
                                title="First name"
                            />
                            <AuthorizationElement
                                formName="lastName"
                                title="Last name"
                            />
                            <button
                                type="submit"
                                className="bg-[#54C1FF] text-white h-7"
                            >
                                Save
                            </button>
                        </div>
                        <div className="border border-t-[#949494]">
                            <input
                                className="fileInput"
                                type="file"
                                name="avatar"
                                onChange={(e) => handleImageChange(e)}
                            />

                            <button
                                className="bg-[#00BB13] text-white border-[#00BB13] border p-1 m-1 w-24 h-7 text-xs"
                                // type="primary"
                                onClick={() => setModalVisible(true)}
                            >
                                Preview
                            </button>
                            <Modal
                                /* title="Vertically centered modal dialog" */
                                centered
                                keyboard
                                footer={null}
                                visible={modalVisible}
                                // onOk={() => this.setModal2Visible(false)}
                                onCancel={() => setModalVisible(false)}
                                width={848}
                                closable={false}
                            >
                                <UserWrapper user={signedUserStore} />
                            </Modal>
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

// import axiosInstance from "../libs/axiosInstance";
import { PageLayout } from "../components/PageLayout";
import { UserWrapper } from "../components/UserWrapper";
import Map from "../components/Map";
import "antd/dist/antd.css";
import axiosConfigured from "../libs/axiosInstance"; //! прибрати

import AuthorizationElement from "../components/AuthorizationElement";
import { Formik, Form } from "formik";

import { Modal, Upload, Button } from "antd";

import { /*  useEffect,  */ useState } from "react";

import { useSelector /* , useDispatch */ } from "react-redux";

import {
    getAuthentification,
    getRunningOperationPromises,
} from "../redux/api.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

export default function Settings() {
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleMap, setModalVisibleMap] = useState(false);

    const { signedUser: signedUserStore } = useSelector(
        (state) => state.authReducer
    );

    async function handleSubmitData({ firstName, lastName }) {
        // let formData = new FormData();
        // formData.append("avatar", file);
        // formData.append("first_name", firstName);
        // formData.append("last_name", lastName);
        try {
            const result = await axiosConfigured.post(
                "/me",
                // formData
                {
                    first_name: firstName,
                    last_name: lastName,
                    // avatar: file,
                }
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

    async function handleImageChange(e) {
        console.log("handleImageChange");
        e.preventDefault();

        let formFile = e.target.files[0];

        // setFile(formFile);

        console.log(formFile, "formFile in input");

        let formData = new FormData();
        formData.append("avatar", formFile /* file */);

        try {
            const result = await axiosConfigured.post("/me/avatar", formData);

            // const response = result.data;

            console.log(result, "response result");

            alert("submit");
        } catch (error) {
            // message.error(`${error.response.data.errors[0]}`);
            console.log(error.response, "error catch");
        }
    }

    function handleUploadImageChange({ file }) {
        console.log(file.originFileObj, "file.originFileObj in Upload");
        let formFile = file.originFileObj;

        setFile(formFile);
    }

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
                                className="bg-[#54C1FF] text-white text-xs h-7"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="border border-t-[#949494]">
                    <label className="flex justify-center cursor-pointer bg-[#54C1FF] border-[#54C1FF] border text-white p-1 m-1 h-7 text-xs">
                        <input
                            className="hidden"
                            type="file"
                            name="avatar"
                            onChange={(e) => handleImageChange(e)}
                        />
                        Upload avatar
                    </label>

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
                    <button
                        className="bg-[#00BB13] text-white border-[#00BB13] border p-1 m-1 w-24 h-7 text-xs"
                        // type="primary"
                        onClick={() => setModalVisibleMap(true)}
                    >
                        Set location
                    </button>
                    <Modal
                        /* title="Vertically centered modal dialog" */
                        centered
                        keyboard
                        footer={null}
                        visible={modalVisibleMap}
                        // onOk={() => this.setModal2Visible(false)}
                        onCancel={() => setModalVisibleMap(false)}
                        width={848}
                        closable={false}
                    >
                        <Map />
                    </Modal>
                </div>
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

export const withoutAuth = (getServerSidePropsFunc) => {
    return async (ctx, ...args) => {
        // console.log("start withoutAuth");
        // // axiosConfigured.setToken();
        // const { token_mytweeter } = ctx.req.cookies;

        // console.log(token_mytweeter, "token before axiosConfigured.setToken");
        // if (token_mytweeter) {
        //     axiosConfigured.setToken(ctx.req.cookies?.token_mytweeter);

        //     try {
        //         console.log("try in withoutAuth");
        //         return {
        //             redirect: {
        //                 destination: `/`,
        //             },
        //         };
        //     } catch (e) {
        //         console.log("catch in withoutAuth");
        //         return getServerSidePropsFunc
        //             ? await getServerSidePropsFunc(ctx, ...args)
        //             : { props: {} };
        //     }
        // }

        return getServerSidePropsFunc
            ? await getServerSidePropsFunc(ctx, ...args)
            : { props: {} };
        // return await getServerSidePropsFunc(null, ...args);
    };
};

export const withRedux = (getServerSideProps) => async (ctx) => {
    console.log("start withRedux");
    const store = initializeStore();
    try {
        console.log("try in withRedux");
        const result = await getServerSideProps(ctx, store);

        return {
            ...result,

            props: {
                initialReduxState: store.getState(),
                ...result.props,
            },
        };
    } catch (error) {
        console.log("catch in withRedux");
        return {
            props: {
                error: true,
            },
        };
    }
};

export const getServerSideProps = withRedux(
    withoutAuth(async (context, store) => {
        console.log("start in getServerSideProps");
        try {
            const result = await store.dispatch(getAuthentification.initiate());
            console.log(
                result,
                "RESULT  from getServerSideProps in SETTING page"
            );
            await Promise.all(getRunningOperationPromises());

            return {
                props: {
                    message: "hello world",
                },
            };
        } catch (error) {
            console.log(error, "error in getServerSideProps");
            store.dispatch(setErrorRedux(error.response, error.message));
            // return {
            //     props: {
            //         error: true,
            //     },
            // };
        }
    })
);

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

import {
    useUpdateCredentialsMutation,
    useUpdateAvatarMutation,
} from "../redux/api.js";

export default function Settings(props) {
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleMap, setModalVisibleMap] = useState(false);

    const { signedUser: signedUserStore } = useSelector(
        (state) => state.authReducer
    );

    console.log(props, "props in Settings !!!!!!!!!!!!!!!!!!!"); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // *********************
    const [updateCredentials] = useUpdateCredentialsMutation();
    const [updateAvatar] = useUpdateAvatarMutation();
    // *********************

    async function handleSubmitData({ firstName, lastName }) {
        //#region
        // let formData = new FormData();
        // formData.append("avatar", file);
        // formData.append("first_name", firstName);
        // formData.append("last_name", lastName);
        //     try {
        //         const result = await axiosConfigured.post(
        //             "/me",
        //             {
        //                 first_name: firstName,
        //                 last_name: lastName,
        //             }
        //         );
        //         // const response = result.data;
        //         console.log(result, "response result");
        //         // Router.push("/");
        //         alert("submit");
        //     } catch (error) {
        //         // message.error(`${error.response.data.errors[0]}`);
        //         console.log(error.response, "error catch");
        //     }
        //#endregion

        await updateCredentials({
            data: {
                first_name: firstName,
                last_name: lastName,
            },
        });
    }

    async function handleImageChange(e) {
        // console.log("handleImageChange");
        e.preventDefault();

        let formFile = e.target.files[0];

        // setFile(formFile);

        // console.log(formFile, "formFile in input");

        let formData = new FormData();
        formData.append("avatar", formFile /* file */);

        // console.log(formData, "formDATA -----------------");

        // try {
        //     const result = await axiosConfigured.post("/me/avatar", formData);

        //     // const response = result.data;

        //     console.log(result, "response result");

        //     alert("submit");
        // } catch (error) {
        //     // message.error(`${error.response.data.errors[0]}`);
        //     console.log(error.response, "error catch");
        // }

        updateAvatar({ data: formData });
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
                <div className="border border-t-[#949494] grid grid-cols-4 gap-4 ">
                    <div>
                        <label className="flex justify-center cursor-pointer bg-[#54C1FF] border-[#54C1FF] border text-white w-full p-1 m-1 h-7 text-xs">
                            <input
                                className="hidden"
                                type="file"
                                name="avatar"
                                onChange={(e) => handleImageChange(e)}
                            />
                            Upload avatar
                        </label>
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            // type="primary"
                            // onClick={() => setModalVisibleMap(true)}
                        >
                            Remove avatar
                        </button>
                    </div>
                    <div>
                        <div>
                            <button
                                className="bg-[#54C1FF] border-[#54C1FF] text-white border p-1 m-1 h-7 w-full text-xs"
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
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            // type="primary"
                            // onClick={() => setModalVisibleMap(true)}
                        >
                            Remove location
                        </button>
                    </div>
                    <div>
                        <button
                            className="bg-[#00BB13] text-white border-[#00BB13] border p-1 m-1 w-full h-7 text-xs"
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
        console.log("start withoutAuth");

        const { token_mytweeter } = ctx.req.cookies;

        console.log(token_mytweeter, "token before axiosConfigured.setToken");
        if (token_mytweeter) {
            axiosConfigured.setToken(ctx.req.cookies?.token_mytweeter);
            return getServerSidePropsFunc
                ? await getServerSidePropsFunc(ctx, ...args)
                : { props: {} };
        } else {
            try {
                // console.log("try in withoutAuth");
                return {
                    redirect: {
                        destination: `/`,
                    },
                };
            } catch (e) {
                // console.log("catch in withoutAuth");
                return getServerSidePropsFunc
                    ? await getServerSidePropsFunc(ctx, ...args)
                    : { props: {} };
            }
        }

        // return getServerSidePropsFunc
        //     ? await getServerSidePropsFunc(ctx, ...args)
        //     : { props: {} };
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

import { setAuth } from "../redux/slices/authSlice."; // --- для використаання slice

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

            if (result.isError) {
                return {
                    redirect: {
                        destination: `/`,
                    },
                };
            }
            if (result.isSuccess) {
                store.dispatch(
                    setAuth({
                        signedUser: /* response. */ result.data.data,
                        isAuth: true,
                        isLoad: true,
                    })
                );
            } else if (result.error?.status === 401) {
                store.dispatch(
                    setAuth({
                        signedUser: {},
                        isAuth: false,
                        isLoad: true,
                    })
                );
            }

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

// import axiosInstance from "../libs/axiosInstance";
import { PageLayout } from "../components/PageLayout";
import { UserWrapper } from "../components/UserWrapper";
import Map from "../components/Map";
import "antd/dist/antd.css";
import axiosConfigured from "../libs/axiosInstance"; //! прибрати

import AuthorizationElement from "../components/AuthorizationElement";
import { Formik, Form } from "formik";

import { Modal, Upload, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { /*  useEffect,  */ useState } from "react";

import { useSelector /* , useDispatch */ } from "react-redux";

import {
    // getAuthentification,
    getRunningOperationPromises,
} from "../redux/api.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

import { authMeRedux } from "../redux/actions/authorizationActions.js";

import {
    // useGetAuthentificationQuery,
    useUpdateCredentialsMutation,
    useUpdateAvatarMutation,
    useUpdateLocationMutation,
} from "../redux/api.js";

import { changeCredentialsSchema } from "../schemas/changeCredentialsSchema";

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
    const [updateLocation] = useUpdateLocationMutation();
    // const { data: dataAuth } = useGetAuthentificationQuery();
    // *********************

    async function handleSubmitData({ firstName, lastName }) {
        await updateCredentials({
            data: {
                first_name: firstName,
                last_name: lastName,
            },
        });
    }

    async function handleAvatarChange(e) {
        console.log(e, "handleImageChange");
        e.preventDefault();

        // console.log(e.target.files);
        // return;
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

        showConfirmAvatar(formData);

        // updateAvatar({ data: formData });
    }

    async function handleAvatarDelete({ firstName, lastName }) {
        showConfirmAvatar({ avatar: null });
        // await updateAvatar({
        // data: {
        //     avatar: null,
        // },
        // });
    }

    function showConfirmAvatar(file) {
        Modal.confirm({
            title: "Change avatar",
            icon: <ExclamationCircleOutlined />,
            content: "Do you Want change Avatar in Profile?",
            onOk() {
                console.log("OK");
                updateAvatar({ data: file });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    async function handleLocationDelete() {
        await updateLocation({
            data: { lat: null, lng: null },
        });
    }

    // function handleUploadImageChange({ file }) {
    //     // console.log(file.originFileObj, "file.originFileObj in Upload");
    //     // let formFile = file.originFileObj;

    //     setFile(file.originFileObj);
    // }

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <span>Settings</span>
            </header>
            <div className=" border border-[#949494] border-t-0">
                <Formik
                    initialValues={{
                        firstName:
                            /* dataAuth ? dataAuth.data */ signedUserStore.first_name,

                        lastName:
                            /* dataAuth ? dataAuth.data */ signedUserStore.last_name
                                ? signedUserStore.last_name
                                : "",
                    }}
                    validationSchema={changeCredentialsSchema}
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
                                accept="image/jpeg, image/png"
                                name="avatar"
                                onChange={(e) => handleAvatarChange(e)}
                            />
                            Upload avatar
                        </label>
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            // type="primary"
                            onClick={(e) => handleAvatarDelete(e)}
                        >
                            Remove avatar
                        </button>
                    </div>
                    <div>
                        <label className="flex justify-center cursor-pointer bg-[#54C1FF] border-[#54C1FF] border text-white w-full p-1 m-1 h-7 text-xs">
                            <input
                                className="hidden"
                                type="file"
                                name="avatar"
                                onChange={(e) => handleBacgroundChange(e)}
                            />
                            Upload background
                        </label>
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            // type="primary"
                            // onClick={() => setModalVisibleMap(true)}
                        >
                            Remove background
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
                                destroyOnClose
                            >
                                <Map />
                            </Modal>
                        </div>
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            // type="primary"
                            onClick={(e) => handleLocationDelete(e)}
                        >
                            Remove location
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#00BB13] text-white border-[#00BB13] border p-1 m-1 w-[80px] h-7 text-xs"
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
                            <UserWrapper
                                user={
                                    signedUserStore /* dataAuth &&
                                    dataAuth.data */
                                }
                            />
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
            // const result = await store.dispatch(getAuthentification.initiate());
            const result = await store.dispatch(authMeRedux());
            console.log(
                result,
                "RESULT  from getServerSideProps in SETTING page"
            );
            await Promise.all(getRunningOperationPromises());

            // if (result.isError) {
            //     return {
            //         redirect: {
            //             destination: `/`,
            //         },
            //     };
            // }
            // if (result.isSuccess) {
            //     store.dispatch(
            //         setAuth({
            //             signedUser: /* response. */ result.data.data,
            //             isAuth: true,
            //             isLoad: true,
            //         })
            //     );
            // } else if (result.error?.status === 401) {
            //     store.dispatch(
            //         setAuth({
            //             signedUser: {},
            //             isAuth: false,
            //             isLoad: true,
            //         })
            //     );
            // }

            return {
                props: {
                    message: "hello world",
                },
            };
        } catch (error) {
            console.log(error, "error in getServerSideProps");
            store.dispatch(setErrorRedux(error.response, error.message));
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
    })
);

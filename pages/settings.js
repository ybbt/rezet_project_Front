import { PageLayout } from "../components/PageLayout";
import { UserWrapper } from "../components/UserWrapper";
import Map from "../components/Map";
import "antd/dist/antd.css";

import Router from "next/router";

import AuthorizationElement from "../components/AuthorizationElement";
import { Formik, Form } from "formik";

import { Modal, Upload, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getRunningOperationPromises } from "../redux/api.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

import { authMeRedux } from "../redux/actions/authorizationActions.js";
import {
    changeAvatar,
    changeBackground,
    changeCredentials,
    changeLocation,
} from "../redux/slices/authSlice";

import {
    useUpdateCredentialsMutation,
    useUpdateAvatarMutation,
    useUpdateBackgroundMutation,
    useUpdateLocationMutation,
} from "../redux/api.js";

import { changeCredentialsSchema } from "../schemas/changeCredentialsSchema";

export default function Settings(props) {
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleMap, setModalVisibleMap] = useState(false);

    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch();

    // *********************
    const [updateCredentials] = useUpdateCredentialsMutation();
    const [updateAvatar] = useUpdateAvatarMutation();
    const [updateBackground] = useUpdateBackgroundMutation();
    const [updateLocation] = useUpdateLocationMutation();

    // *********************

    useEffect(() => {
        if (!isAuthStore) {
            console.log(isAuthStore, "isAuthStore in sign_layout");
            Router.push("/");
        }
    }, [isAuthStore]);

    async function handleSubmitData({ firstName, lastName }) {
        const { isError: IsErrorCredentials, data: dataCredentials } =
            await updateCredentials({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            });
        if (!IsErrorCredentials) {
            dispatch(
                changeCredentials({
                    firstName,
                    lastName,
                })
            );
        }
    }

    async function handleAvatarChange(e) {
        console.log(e, "handleImageChange");
        e.preventDefault();

        let formFile = e.target.files[0];

        let formData = new FormData();
        formData.append("avatar", formFile);
        // formData.append("delete", 0);

        showConfirmAvatar(formData);
    }

    async function handleAvatarDelete() {
        showConfirmAvatar({ delete: 1 });
    }

    function showConfirmAvatar(file) {
        Modal.confirm({
            title: "Change avatar",
            icon: <ExclamationCircleOutlined />,
            content: "Do you Want change Avatar in Profile?",
            async onOk() {
                console.log("OK");
                const { isError: isErrorAvatar, data: dataAvatar } =
                    await updateAvatar({ data: file });
                if (!isErrorAvatar) {
                    dispatch(
                        changeAvatar({
                            avatar_path: dataAvatar.data.avatar_path,
                        })
                    );
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    //************************************
    async function handleBackgroundChange(e) {
        console.log(e, "handleImageChange");
        e.preventDefault();

        let formFile = e.target.files[0];

        let formData = new FormData();
        formData.append("background", formFile);

        showConfirmBackground(formData);
    }

    async function handleBackgroundDelete() {
        showConfirmBackground({ delete: 1 });
    }

    function showConfirmBackground(file) {
        Modal.confirm({
            title: "Change background",
            icon: <ExclamationCircleOutlined />,
            content: "Do you Want change Background in Profile?",
            async onOk() {
                console.log("OK");
                const { isError: isErrorBackground, data: dataBackground } =
                    await updateBackground({ data: file });
                if (!isErrorBackground) {
                    dispatch(
                        changeBackground({
                            background_path:
                                dataBackground.data.background_path,
                        })
                    );
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }
    //************************************

    async function handleLocationDelete() {
        const { isError: isErrorLocation, data: dataLocation } =
            await updateLocation({
                data: { lat: null, lng: null },
            });
        if (!isErrorLocation) {
            dispatch(changeLocation({ lat: false, lng: false }));
            console.log(
                signedUserStore,
                "signedUserStore in handleLocationDelete"
            );
        }
    }

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <span>Settings</span>
            </header>
            <div className=" border border-[#949494] border-t-0">
                <Formik
                    initialValues={{
                        firstName: signedUserStore.first_name,

                        lastName: signedUserStore.last_name
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
                                name="background"
                                onChange={(e) => handleBackgroundChange(e)}
                            />
                            Upload background
                        </label>
                        <button
                            className="bg-[#FF5757] border-[#FF5757] border text-white p-1 m-1 w-full h-7 text-xs"
                            onClick={(e) => handleBackgroundDelete(e)}
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
                                centered
                                keyboard
                                footer={null}
                                visible={modalVisibleMap}
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
                            onClick={(e) => handleLocationDelete(e)}
                        >
                            Remove location
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#00BB13] text-white border-[#00BB13] border p-1 m-1 w-[80px] h-7 text-xs"
                            onClick={() => setModalVisible(true)}
                        >
                            Preview
                        </button>

                        <Modal
                            centered
                            keyboard
                            footer={null}
                            visible={modalVisible}
                            onCancel={() => setModalVisible(false)}
                            width={848}
                            closable={false}
                            destroyOnClose
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
    return <PageLayout>{page}</PageLayout>;
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
                return {
                    redirect: {
                        destination: `/`,
                    },
                };
            } catch (e) {
                return getServerSidePropsFunc
                    ? await getServerSidePropsFunc(ctx, ...args)
                    : { props: {} };
            }
        }
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

import { setAuth } from "../redux/slices/authSlice"; // --- для використаання slice

export const getServerSideProps = withRedux(
    withoutAuth(async (context, store) => {
        console.log("start in getServerSideProps");
        try {
            const result = await store.dispatch(authMeRedux());
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
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
    })
);

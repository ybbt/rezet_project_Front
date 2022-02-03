import useAuthStatus from "../../hooks/useAuthStatus";

import useErrorStore from "../../hooks/useErrorStore";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";

import {
    useGetAuthentificationQuery,
    getRunningOperationPromises,
} from "../../redux/api.js";

// import { useRouter } from "next/dist/client/router"; //? ХЗ нафіга
import { api } from "../../redux/api";

import { setAuth } from "../../redux/slices/authSlice"; // --- для використаання slice

export default function SignLayout({ children, title }) {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    // console.log(state, "state in SignLayout");
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const isLoadStore = useSelector((state) => state.authReducer.isLoad);

    useAuthStatus();

    // const {
    //     data: dataAuth,
    //     isError: isErrorAuth,
    //     error: errorAuth,
    //     isLoading: isLoadingAuth,
    //     isSuccess: isSuccessAuth,
    // } = useGetAuthentificationQuery();

    // useEffect(async () => {
    //     console.log(
    //         isSuccessAuth,
    //         dataAuth && dataAuth.data,
    //         errorAuth && errorAuth.status,
    //         "%c useEffect single in sign_Layout ----------------------"
    //         // "color: green"
    //     );
    //     if (isSuccessAuth) {
    //         dispatch(
    //             setAuth({
    //                 signedUser: /* response. */ dataAuth.data,
    //                 isAuth: true,
    //                 isLoad: true,
    //             })
    //         );
    //     } else if (errorAuth?.status === 401) {
    //         dispatch(
    //             setAuth({
    //                 signedUser: {},
    //                 isAuth: false,
    //                 isLoad: true,
    //             })
    //         );
    //     }
    // }, [isSuccessAuth]);

    // useEffect(async () => {
    //     console.log(
    //         isSuccessAuth,
    //         dataAuth && dataAuth.data,
    //         errorAuth && errorAuth.status,
    //         "%c useEffect infin in sign_Layout ++++++++++++++++++++"
    //         // "color: green"
    //     );
    //     if (!isSuccessAuth) {
    //         if (
    //             errorAuth?.status === 401 &&
    //             (isAuthStore === true || isAuthStore === null)
    //         ) {
    //             console.log(
    //                 "%c useEffect infin in pageLayout ||||||||||||||||||||"
    //                 // "color: green"
    //             );
    //             dispatch(
    //                 setAuth({
    //                     signedUser: {},
    //                     isAuth: false,
    //                     isLoad: true,
    //                 })
    //             );
    //         }
    //     }
    // });

    useEffect(() => {
        if (isAuthStore) {
            console.log(isAuthStore, "isAuthStore in sign_layout");
            Router.push("/");
        }
    }, [isAuthStore]);

    useErrorStore();

    if (!isLoadStore || isAuthStore) {
        return (
            // <div className="w-full flex justify-center h-screen">
            //     <Spin size="large" />;
            // </div>

            <div className="flex items-center justify-center space-x-2 animate-bounce h-screen">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full "></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
            </div>

            // <div class=" flex justify-center items-center">
            //     <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            // </div>
        );
    }

    return (
        <div className=" flex justify-center w-96 border-[#949494] border-2">
            <div className="w-52 flex items-center flex-col">
                <h1 className="text-xl font-bold text-[#54C1FF] mt-4">
                    {title}
                </h1>
                {children}
            </div>
        </div>
    );
}

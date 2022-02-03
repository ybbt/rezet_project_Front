import { SignBanner } from "../../components/SignBanner";
import { MainMenu } from "../../components/MainMenu";
// import { UserBanner } from "../../components/UserBanner";
import { DropdownUserMenu } from "../../components/DropdownUserMenu";

import { useSelector, useDispatch } from "react-redux";
// import { authMeRedux } from "../../redux/actions/authorizationActions.js";

import ErrorPage from "next/error";

import useAuthStatus from "../../hooks/useAuthStatus";
import useErrorStore from "../../hooks/useErrorStore";

import {
    useGetAuthentificationQuery,
    getRunningOperationPromises,
} from "../../redux/api.js";

// import { useRouter } from "next/dist/client/router"; //? ХЗ нафіга
import { api } from "../../redux/api";

import { setAuth } from "../../redux/slices/authSlice."; // --- для використаання slice

// import { authMeRedux } from "../../redux/actions/authorizationActions.js";
import { useEffect } from "react";

import Cookies from "js-cookie";

export function PageLayout({ children /* , headerContent */ }) {
    const dispatch = useDispatch();
    const { isAuth: isAuthStore, isLoad: isLoadStore } = useSelector(
        (state) => state.authReducer
    );

    const stateStore = useSelector((state) => state);
    console.log(stateStore, "state in pageLayout");

    const isSkip = !Cookies.get("token_mytweeter");

    // const {
    //     data: dataAuth,
    //     isError: isErrorAuth,
    //     error: errorAuth,
    //     isLoading: isLoadingAuth,
    //     isSuccess: isSuccessAuth,
    // } = useGetAuthentificationQuery();

    // const result = useGetAuthentificationQuery(undefined, { skip: isSkip });
    // console.log(result, "result useGetAuthentificationQuery PageLayout");

    useAuthStatus();

    // useEffect(async () => {
    //     console.log(
    //         isSuccessAuth,
    //         dataAuth && dataAuth.data,
    //         errorAuth && errorAuth.status,
    //         "%c useEffect single in pageLayout ----------------------"
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
    //         "%c useEffect infin in pageLayout ++++++++++++++++++++"
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

    const errorStatus = useErrorStore();
    if (errorStatus) {
        return <ErrorPage statusCode={errorStatus} />;
    }

    const signBanner =
        /* !isSuccessAuth */ !isAuthStore /* dataAuth && !dataAuth.data */ &&
            /* !isLoadingAuth */ isLoadStore /* isLoadingAuth */ && (
                <SignBanner />
            );

    const userBannerDropdown =
        /* isSuccessAuth */ isAuthStore /* dataAuth && dataAuth?.data */ && (
            <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
                <DropdownUserMenu />
            </div>
        );

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                <div className="max-w-[800px] min-w-[600px] w-3/5 h-full flex flex-col ">
                    <div className="w-32 h-40 fixed  border border-gray text-xl font-medium flex flex-col top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11">
                        <MainMenu />
                    </div>
                    {userBannerDropdown}
                    {/* <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                        {headerContent}
                    </header> */}
                    {children}
                </div>
            </div>
            {signBanner}
        </div>
    );
}

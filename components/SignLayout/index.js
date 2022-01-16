import useAuthStatus from "../../hooks/useAuthStatus";

import useErrorStore from "../../hooks/useErrorStore";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

export default function SignLayout({ children, title }) {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const isLoadStore = useSelector((state) => state.authReducer.isLoad);

    useAuthStatus();

    useEffect(() => {
        if (isAuthStore) {
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

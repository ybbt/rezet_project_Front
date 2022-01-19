import { useEffect, useContext } from "react";
import signedUserContext from "../../context/signedUserContext";

import { message } from "antd";
import "antd/dist/antd.css";

import { SignBanner } from "../../components/SignBanner";
import { MainMenu } from "../../components/MainMenu";
import { UserBanner } from "../../components/UserBanner";

import { fetchAuth } from "../../libs/authorizeService";
import Cookies from "js-cookie";

export function PageLayout({ children }) {
    const [auth, setAuth] = useContext(signedUserContext);
    const { signedUser, isLoaded } = auth;

    useEffect(async () => {
        try {
            setAuth({
                ...auth,
                ...{ isLoaded: false },
            });
            const result = await fetchAuth();

            setAuth({
                ...auth,
                ...{ signedUser: result.data.data, isLoaded: true },
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Cookies.remove("token_mytweeter");
                setAuth({
                    ...auth,
                    ...{ signedUser: {}, isLoaded: true },
                });
            } else {
                console.log(error);
                message.error(`${error}`);
            }
        }
    }, []);

    const signBanner = !Object.keys(signedUser).length && isLoaded && (
        <SignBanner />
    );

    const userBannerDropdown = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner />
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                <div className="max-w-[800px] min-w-[600px] w-3/5 h-full flex flex-col ">
                    <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                        <MainMenu />
                    </div>
                    {userBannerDropdown}
                    {children}
                </div>
            </div>
            {signBanner}
        </div>
    );
}

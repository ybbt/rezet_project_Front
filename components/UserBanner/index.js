import { useContext } from "react";

import Image from "next/image";

import { message } from "antd";

import { /* fetchAuth,  */ fetchSignOut } from "../../libs/authorizeService";

import Cookies from "js-cookie";

import { DropdownUserMenu } from "../DropdownUserMenu";

import signedUserContext from "../../context/signedUserContext";

export function UserBanner(/* { onLogout } */) {
    const [/* signedUser */ auth, setAuth] = useContext(signedUserContext);
    const { signedUser } = auth;

    async function handlerLogout() {
        try {
            await fetchSignOut();

            Cookies.remove("token_mytweeter");

            /* setSignedUser */ setAuth({ ...auth, signedUser: {} });
        } catch (error) {
            console.log(error, "error");
            message.error(`${error}`);
        }
    }

    return (
        <DropdownUserMenu onLogout={/* onLogout */ handlerLogout}>
            <div className="flex w-full">
                <div className="pr-4 ">
                    <Image src="/avatar.png" width="40" height="40" />
                </div>
                <div className="">
                    <div className="font-medium text-xs">{`${signedUser.first_name}`}</div>
                    <div className="text-[#949494] text-[0.625rem]">{`@${signedUser.name}`}</div>
                </div>
            </div>
        </DropdownUserMenu>
    );
}

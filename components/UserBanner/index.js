import { useContext } from "react";

import Image from "next/image";

import { DropdownUserMenu } from "../DropdownUserMenu";

import signedUserContext from "../../context/signedUserContext";

export function UserBanner({ onLogout }) {
    const [signedUser] = useContext(signedUserContext);
    return (
        <DropdownUserMenu onLogout={onLogout}>
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

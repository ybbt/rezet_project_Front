import Image from "next/image";

import { DropdownUserMenu } from "../DropdownUserMenu";

export function UserBanner({ user, onLogout }) {
    return (
        <DropdownUserMenu user={user} onLogout={onLogout}>
            <div className="flex w-full">
                <div className="pr-4 ">
                    <Image src="/avatar.png" width="40" height="40" />
                </div>
                <div className="">
                    <div className="font-medium text-xs">{`${user.first_name}`}</div>
                    <div className="text-[#949494] text-[0.625rem]">{`@${user.name}`}</div>
                </div>
            </div>
        </DropdownUserMenu>
    );
}

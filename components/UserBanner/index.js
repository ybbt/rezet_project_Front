import Image from "next/image";

import { DropdownUserMenu } from "../DropdownUserMenu";

import { useSelector, useDispatch } from "react-redux";

import { logoutRedux } from "../../redux/actions/authorizationActions.js";

export function UserBanner({ /* user, */ onLogout }) {
    const dispatch = useDispatch();
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    return (
        <DropdownUserMenu
            /* user={user} */ onLogout={onLogout /* dispatch(logoutRedux()) */}
        >
            <div className="flex w-full">
                <div className="pr-4 ">
                    <Image src="/avatar.png" width="40" height="40" />
                </div>
                <div className="">
                    <div className="font-medium text-xs">{`${signedUserStore.first_name}`}</div>
                    <div className="text-[#949494] text-[0.625rem]">{`@${signedUserStore.name}`}</div>
                </div>
            </div>
        </DropdownUserMenu>
    );
}

import Image from "next/image";

import { Menu, Dropdown, Button, Space } from "antd";
import Router from "next/router";

import { useSelector, useDispatch } from "react-redux";

import { logoutRedux } from "../../redux/actions/authorizationActions.js";

import Cookies from "js-cookie";

// ********************
import {
    useLogoutMutation,
    useGetAuthentificationQuery,
} from "../../redux/api.js";
import { setLogout } from "../../redux/slices/authSlice."; // --- для використаання slice
// ********************

export function DropdownUserMenu(/* { children } */) {
    const dispatch = useDispatch();
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const [getLogout] = useLogoutMutation();

    // const {
    //     data: dataAuth,
    //     /*         isError: isErrorAuth,
    //     error: errorAuth,
    //     isLoading: isLoadingAuth,
    //     isSuccess: isSuccessAuth, */
    // } = useGetAuthentificationQuery();

    const menuKey = {
        profile: "1",
        logout: "2",
    };

    async function handleMenuClick({ key }) {
        switch (key) {
            case menuKey.profile:
                Router.push(`/${/* signedUserStore */ dataAuth.data.name}`);
                break;
            case menuKey.logout:
                // dispatch(logoutRedux());
                /* const { error } =  */ await getLogout({});

                // if (!error) {
                Cookies.remove("token_mytweeter");

                dispatch(
                    setLogout({
                        signedUser: {},
                        isAuth: false,
                        isLoad: true,
                    })
                );

                break;
        }
    }

    const avatarPath =
        /* dataAuth.data.*/ signedUserStore.avatar_path ?? "/avatar.png";

    const menu = (
        <Menu
            onClick={handleMenuClick}
            style={{ position: "fixed", bottom: "65px" }}
        >
            <Menu.Item
                key={menuKey.profile}
                style={{ borderWidth: "1px", borderColor: "black" }}
            >
                Profile
            </Menu.Item>
            <Menu.Item
                key={menuKey.logout}
                style={{ borderWidth: "1px", borderColor: "black" }}
            >
                Sign out
            </Menu.Item>
        </Menu>
    );

    return (
        <Space wrap>
            <Dropdown overlay={menu} trigger={["click"]} placement="topLeft">
                <Button
                    style={{ borderWidth: "0", padding: "4px", width: "100%" }}
                >
                    {/* {children} */}
                    <div className="flex w-full">
                        <div className="pr-4 ">
                            <Image
                                className="rounded-full"
                                src={avatarPath}
                                width="40"
                                height="40"
                            />
                        </div>
                        <div className="">
                            <div className="font-medium text-xs">{`${
                                signedUserStore.first_name /* dataAuth.data.first_name */
                            }`}</div>
                            <div className="text-[#949494] text-[0.625rem]">{`@${
                                signedUserStore.name /* dataAuth.data.name */
                            }`}</div>
                        </div>
                    </div>
                </Button>
            </Dropdown>
        </Space>
    );
}

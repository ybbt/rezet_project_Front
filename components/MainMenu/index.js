import Link from "next/link";
// import { useContext } from "react";

// import signedUserContext from "../../context/signedUserContext";
import {
    HomeOutlined,
    MailOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Space } from "antd";

import { useSelector } from "react-redux";

export function MainMenu({ isAuth }) {
    // const [signedUserAppContext, setSignedUserAppContext] =
    //     useContext(signedUserContext);

    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const authUserMenu = isAuth && (
        <>
            <Link href="#" className="">
                <a className="text-black ">
                    <Space>
                        <MailOutlined />
                        Messages
                    </Space>
                </a>
            </Link>
            <Link href="#">
                <a className="text-black">
                    <Space>
                        <TeamOutlined />
                        Users
                    </Space>
                </a>
            </Link>
            <Link href={`/${/* signedUserAppContext */ signedUserStore.name}`}>
                <a className="text-black">
                    <Space>
                        <UserOutlined />
                        Profile
                    </Space>
                </a>
            </Link>
            <Link href="#">
                <a className="text-black">
                    <Space>
                        <SettingOutlined />
                        Settings
                    </Space>
                </a>
            </Link>
        </>
    );

    return (
        <>
            <Link href="/">
                <a className="text-black ">
                    <Space>
                        <HomeOutlined />
                        Home
                    </Space>
                </a>
            </Link>
            {authUserMenu}
        </>
    );
}

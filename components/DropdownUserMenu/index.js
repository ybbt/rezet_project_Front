import { Menu, Dropdown, Button, Space } from "antd";
import Router from "next/router";

import { useSelector } from "react-redux";

export function DropdownUserMenu({ children, /* user, */ onLogout }) {
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const menuKey = {
        profile: "1",
        logout: "2",
    };

    function handleMenuClick({ key }) {
        switch (key) {
            case menuKey.profile:
                Router.push(`/${signedUserStore.name}`);
                break;
            case menuKey.logout:
                onLogout();
                break;
        }
    }

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
                    {children}
                </Button>
            </Dropdown>
        </Space>
    );
}

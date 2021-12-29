import { Menu, Dropdown, Button, Space } from "antd";
import Router from "next/router";

import { UserBanner } from "../UserBanner";

export function DropdownUserMenu({ user, /* onProfile,  */ onLogout }) {
    const menuKey = {
        profile: "1",
        logout: "2",
    };

    function handleMenuClick({ key }) {
        switch (key) {
            case menuKey.profile:
                Router.push(`/user/${user.name}`);
                break;
            case menuKey.logout:
                onLogout();
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
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
            <Dropdown overlay={menu} placement="topLeft">
                <Button
                    style={{ borderWidth: "0", padding: "4px", width: "100%" }}
                >
                    <UserBanner user={user} />
                </Button>
            </Dropdown>
        </Space>
    );
}

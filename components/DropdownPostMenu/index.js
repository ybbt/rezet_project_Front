import { Menu, Dropdown, Button, Space } from "antd";

export function DropdownPostMenu({ onDeletePost, onEditPost }) {
    const menuKey = {
        edit: "1",
        delete: "2",
    };

    function handleMenuClick({ key }) {
        switch (key) {
            case menuKey.edit:
                onEditPost();
                break;
            case menuKey.delete:
                onDeletePost(post);
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
                key={menuKey.edit}
                style={{ borderWidth: "1px", borderColor: "black" }}
            >
                Edit
            </Menu.Item>
            <Menu.Item
                key={menuKey.delete}
                style={{ borderWidth: "1px", borderColor: "black" }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <Space wrap>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button style={{ borderWidth: "0" }}>...</Button>
            </Dropdown>
        </Space>
    );
}

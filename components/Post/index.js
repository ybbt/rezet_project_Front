import { useState } from "react";
import axios from "axios";

import { EditPost } from "../EditPost";

import { Menu, Dropdown, Button, Space } from "antd";
import "antd/dist/antd.css";

export function Post({ post, onDeletePost, onUpdatePost, signedUserId }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

    const menuKey = {
        edit: "1",
        delete: "2",
    };

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        const newPost = { ...post };

        newPost.text = content;

        onUpdatePost(newPost);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        <EditPost
            editContent={/* textContent */ post.text}
            onSave={handleUdate}
            onCancel={handleCancel}
        />
    ) : (
        <div>{/* textContent */ post.text}</div>
    );

    function handleMenuClick({ key }) {
        switch (key) {
            case menuKey.edit:
                handleEdit();
                break;
            case menuKey.delete:
                onDeletePost(post);
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key={menuKey.edit}>Edit</Menu.Item>
            <Menu.Item key={menuKey.delete}>Delete</Menu.Item>
        </Menu>
    );

    const dropdownMenu =
        signedUserId !== post.user_id ? null : (
            <Space wrap>
                <Dropdown overlay={menu}>
                    <Button>...</Button>
                </Dropdown>
            </Space>
        );

    return (
        <div className="border-2 border-black border-t-0 p-2">
            {/* <Space wrap>
                <Dropdown overlay={menu}>
                    <Button>...</Button>
                </Dropdown>
            </Space> */}
            {dropdownMenu}
            <div>{post.user.name}</div>
            <div>{post.created_at}</div>
            {displayContent}
        </div>
    );
}

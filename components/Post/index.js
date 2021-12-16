import { useState } from "react";
import axios from "axios";

import { EditPost } from "../EditPost";

import { Menu, Dropdown, Button, Space } from "antd";
// import "antd/dist/antd.css";

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
            editContent={post.text}
            onSave={handleUdate}
            onCancel={handleCancel}
        />
    ) : (
        <div className="max-w-2xl min-w-[32rem]">{post.text}</div>
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
            <Menu.Item
                key={menuKey.edit}
                style={{ "border-width": "1px", "border-color": "black" }}
            >
                Edit
            </Menu.Item>
            <Menu.Item
                key={menuKey.delete}
                style={{ "border-width": "1px", "border-color": "black" }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    const dropdownMenu =
        signedUserId !== post.user_id ? null : (
            <Space wrap>
                <Dropdown overlay={menu}>
                    <Button
                        style={{ "border-width": "0" }}
                        // className="border-0"
                    >
                        ...
                    </Button>
                </Dropdown>
            </Space>
        );

    return (
        <div className="border-2 border-black border-t-0 p-2 h-full min-h-[7rem] max-h-48 w-full">
            <div className="w-full flex justify-end items-center">
                {dropdownMenu}
            </div>
            <div>{post.user.name}</div>
            <div>{post.created_at}</div>
            {displayContent}
            {/* style={{ "border-width": "0" }} */}
        </div>
    );
}

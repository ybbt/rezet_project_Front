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

    const dropdownMenu =
        signedUserId !== post.user_id ? null : (
            <Space wrap>
                <Dropdown overlay={menu}>
                    <Button style={{ borderWidth: "0" }}>...</Button>
                </Dropdown>
            </Space>
        );

    return (
        <div className="border-2 border-black border-t-0 px-4 py-3 h-full min-h-[7rem] max-h-48 w-full flex justify-between">
            <div className="pr-4 ">
                <img src="avatar.png" className="w-16 "></img>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex">
                        <div>{post.user.name}</div>
                        <div>{post.created_at}</div>
                    </div>
                    {dropdownMenu}
                </div>
                {displayContent}
            </div>
        </div>
    );
}

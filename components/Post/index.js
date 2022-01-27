import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";

// import moment from "moment";
import { DateTime } from "luxon";
import useFormatDate from "../../hooks/useFormatDate";

import { Tooltip } from "antd";
import { MessageOutlined, EditOutlined } from "@ant-design/icons";

import { EditPostForm } from "../EditPostForm";
import { DropdownPostMenu } from "../DropdownPostMenu";

export function Post({
    post,
    onDeletePost,
    onUpdatePost /* , signedUserName */,
}) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

    // ! Поки не зробив аутентифікацію на rtkq
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        const newPost = { ...post };

        newPost.content = content;
        newPost.updated_at = DateTime.now();

        onUpdatePost(newPost);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        <EditPostForm
            editContent={post.content}
            onSave={handleUdate}
            onCancel={handleCancel}
            contentKind="post"
        />
    ) : (
        <div className="max-w-2xl min-w-[32rem]">{post.content}</div>
    );

    // ! Поки не зробив аутентифікацію на rtkq
    const dropdownMenu = /* signedUserName */ signedUserStore.name ===
        post.author.name && (
        <DropdownPostMenu
            onDeletePost={() => onDeletePost(post)}
            onEditPost={handleEdit}
        />
    );

    const createdAt = useFormatDate(post.created_at, "dd LLL y"); //moment(post.created_at).format("D MMM YYYY");
    const updatedAt = useFormatDate(post.updated_at, "dd LLL y"); //moment(post.updated_at).format("D MMM YYYY HH:mm");

    const updatedAtComponent = post.created_at !== post.updated_at && (
        <Tooltip
            placement="right"
            title={updatedAt}
            overlayInnerStyle={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
            }}
        >
            <EditOutlined />
        </Tooltip>
    );

    // TODO в ХУК
    const avatarPath = post.author.avatar_path ?? "/avatar.png";

    console.log(avatarPath, "avatarPath");

    return (
        <div className="border border-[#949494] border-t-0 first:border-t-2 py-3 h-full min-h-[7rem] max-h-48 w-full flex justify-between box-border">
            <Link href={`/${post.author.name}`}>
                <a className="block min-w-[60px] mx-4">
                    <Image
                        className="rounded-full"
                        src={avatarPath}
                        width="60"
                        height="60"
                    />
                </a>
            </Link>

            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex ">
                        <Link href={`/${post.author.name}`}>
                            <a className="text-black no-underline">
                                <div className="font-bold text-base pr-2">{`${
                                    post.author.first_name
                                } ${post.author.last_name || ""}`}</div>
                            </a>
                        </Link>
                        <div className="after:content-['*'] after:w-[10px] after:mx-[3px] text-[#949494] no-underline">
                            <Link href={`/${post.author.name}`}>
                                <a className="text-inherit">
                                    <span className="text-inherit">{`@${post.author.name}`}</span>
                                </a>
                            </Link>
                        </div>
                        <div className="text-[#949494] mr-3">{createdAt}</div>
                        {updatedAtComponent}
                    </div>
                    {dropdownMenu}
                    {/* // ! Поки не зробив аутентифікацію на rtkq */}
                </div>
                {displayContent}
                <Link href={`/posts/${post.id}`}>
                    <a className="flex">
                        <MessageOutlined />
                        <div>{post.comments_count}</div>
                    </a>
                </Link>
            </div>
        </div>
    );
}

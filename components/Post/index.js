import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import moment from "moment";

import { MessageOutlined } from "@ant-design/icons";

import { EditPostForm } from "../EditPostForm";
import { DropdownPostMenu } from "../DropdownPostMenu";

export function Post({ post, onDeletePost, onUpdatePost, signedUserName }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        const newPost = { ...post };

        newPost.content = content;

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
        />
    ) : (
        <div className="max-w-2xl min-w-[32rem]">{post.content}</div>
    );

    const dropdownMenu = signedUserName === post.author.name && (
        <DropdownPostMenu
            onDeletePost={() => onDeletePost(post)}
            onEditPost={handleEdit}
        />
    );

    const createdAt = moment(post.created_at).format("D MMM YYYY");

    return (
        <div className="border border-[#949494] border-t-0 first:border-t-2 py-3 h-full min-h-[7rem] max-h-48 w-full flex justify-between box-border">
            <Link href={`/${post.author.name}`}>
                <a className="block min-w-[60px] mx-4">
                    <Image src="/avatar.png" width="60" height="60" />
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
                        <div className="text-[#949494]">{createdAt}</div>
                    </div>
                    {dropdownMenu}
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

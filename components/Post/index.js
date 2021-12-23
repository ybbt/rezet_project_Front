import { useState } from "react";
import Link from "next/link";

import axios from "axios";

import Image from "next/image";

import { EditPostForm } from "../EditPostForm";

import moment from "moment";

import { DropdownPostMenu } from "../DropdownPostMenu";

export function Post({ post, onDeletePost, onUpdatePost, signedUserId }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

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
        <EditPostForm
            editContent={post.text}
            onSave={handleUdate}
            onCancel={handleCancel}
        />
    ) : (
        <div className="max-w-2xl min-w-[32rem]">{post.text}</div>
    );

    const dropdownMenu = signedUserId === post.user_id && (
        <DropdownPostMenu
            onDeletePost={() => onDeletePost(post)}
            onEditPost={handleEdit}
        />
    );

    const createdAt = moment(post.created_at).format("D MMM YYYY");

    return (
        <div className="border border-[#949494] border-t-0 first:border-t-2 py-3 h-full min-h-[7rem] max-h-48 w-full flex justify-between">
            <div className="pr-4 ">
                <Link href={`/user/${post.user.id}`}>
                    <a>
                        <Image
                            src="/avatar.png"
                            width="60px"
                            height="60px"
                            // className="w-10 "
                        />
                    </a>
                </Link>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex">
                        <div className="after:content-['*'] after:w-[10px] after:mx-[3px] text-[#949494] no-underline">
                            <Link href={`/user/${post.user.id}`}>
                                <a className="text-inherit">
                                    <span className="text-inherit">{`@${post.user.name}`}</span>
                                </a>
                            </Link>
                        </div>
                        <div className="text-[#949494]">{createdAt}</div>
                    </div>
                    {dropdownMenu}
                </div>
                {displayContent}
            </div>
        </div>
    );
}

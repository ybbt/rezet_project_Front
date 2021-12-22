import { useState } from "react";
import axios from "axios";

import Image from "next/image";

import { EditPost } from "../EditPost";

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
        <EditPost
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
                <Image
                    src="/avatar.png"
                    width="60px"
                    height="60px"
                    // className="w-10 "
                />
            </div>
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex">
                        <div className="after:content-['*'] after:w-[10px] after:mx-[3px] text-[#949494]">
                            <span>{`@${post.user.name}`}</span>
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

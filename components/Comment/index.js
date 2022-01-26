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

export function Comment({
    /* post */ comment,
    onDeleteComment,
    onUpdateComment,
    // signedUserName,
}) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

    // const commentsListStore = useSelector(
    //     (state) => state.commentsReducer.commentsList
    // );
    // const signedUserStore = useSelector(
    //     (state) => state.authReducer.signedUser
    // );

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        const newComment = { ...comment };

        newComment.content = content;
        newComment.updated_at = DateTime.now();

        onUpdateComment(newComment);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        <EditPostForm
            editContent={comment.content}
            onSave={handleUdate}
            onCancel={handleCancel}
            contentKind="comment"
        />
    ) : (
        <div className="max-w-2xl min-w-[32rem]">{comment.content}</div>
    );

    //! до повернення авторизації
    // const dropdownMenu = /* signedUserName */ signedUserStore.name ===
    //     comment.author.name && (
    //     <DropdownPostMenu
    //         onDeletePost={() => onDeleteComment(/* post */ comment)}
    //         onEditPost={handleEdit}
    //     />
    // );

    const createdAt = useFormatDate(comment.created_at, "dd MMM y"); //moment(comment.created_at).format("D MMM YYYY");
    const updatedAt = useFormatDate(comment.updated_at, "dd MMM y"); //moment(comment.updated_at).format("D MMM YYYY HH:mm");

    const updatedAtComponent = comment.created_at !== comment.updated_at && (
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

    const avatarPath = comment.author.avatar_path ?? "/avatar.png";

    return (
        <div className="border border-[#949494] border-t-0 first:border-t-2 py-3 h-full min-h-[7rem] max-h-48 w-full flex justify-between box-border">
            <Link href={`/${comment.author.name}`}>
                <a className="block min-w-[60px] mx-4">
                    <Image
                        className="rounded-full"
                        src={`${avatarPath}`}
                        width="60"
                        height="60"
                    />
                </a>
            </Link>

            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex ">
                        <Link href={`/${comment.author.name}`}>
                            <a className="text-black no-underline">
                                <div className="font-bold text-base pr-2">{`${
                                    comment.author.first_name
                                } ${comment.author.last_name || ""}`}</div>
                            </a>
                        </Link>
                        <div className="after:content-['*'] after:w-[10px] after:mx-[3px] text-[#949494] no-underline">
                            <Link href={`/${comment.author.name}`}>
                                <a className="text-inherit">
                                    <span className="text-inherit">{`@${comment.author.name}`}</span>
                                </a>
                            </Link>
                        </div>
                        <div className="text-[#949494] mr-3">{createdAt}</div>
                        {updatedAtComponent}
                    </div>
                    {/* {dropdownMenu} //! */}
                </div>
                {displayContent}
            </div>
        </div>
    );
}

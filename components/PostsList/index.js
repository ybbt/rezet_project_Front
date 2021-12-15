import { useState } from "react";
import { Post } from "../Post/index";

export function PostsList({
    postsList,
    onDeletePost,
    onUpdatePost,
    signedUser,
}) {
    return postsList.map((postItem) => {
        return (
            // <div className="min-h-[7rem] max-h-48 w-full ">
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
                signedUserId={signedUser.id}
            />
            // </div>
        );
    });
}

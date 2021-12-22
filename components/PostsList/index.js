import { useState } from "react";
import { Post } from "../Post/index";

export function PostsList({
    postsList,
    onDeletePost,
    onUpdatePost,
    signedUser,
}) {
    console.log(postsList, "postsList ->");
    return postsList.map((postItem) => {
        return (
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
                signedUserId={signedUser.id}
            />
        );
    });
}

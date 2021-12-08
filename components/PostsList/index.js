import { useState } from "react";
import { Post } from "../Post/index";

export function PostsList({ postsList, onDeletePost, onUpdatePost }) {
    const postComponent = postsList.map((postItem) => {
        return (
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
            />
        );
    });

    return <>{postComponent}</>;
}

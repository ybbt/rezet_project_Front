import { useState, useEffect } from "react";
import { PostComponent } from "../PostComponent/index";

export function PostListComponent({ postsList, onDeletePost, onUpdatePost }) {
    const postComponent = postsList.map((postItem) => {
        return (
            <PostComponent
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
            />
        );
    });

    return <>{postComponent}</>;
}

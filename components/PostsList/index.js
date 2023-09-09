import { useContext } from "react";

import { Post } from "../Post/index";

import { useSelector } from "react-redux";

export function PostsList({ onDeletePost, onUpdatePost }) {
    const postsListStore = useSelector((state) => state.postsReducer.postsList);

    return postsListStore.map((postItem) => {
        return (
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
            />
        );
    });
}

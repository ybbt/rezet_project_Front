import { useContext } from "react";

import { Post } from "../Post/index";

import { useSelector } from "react-redux";

export function PostsList({
    postsList,
    onDeletePost,
    onUpdatePost,
    // signedUser,
}) {
    const postsListStore = useSelector((state) => state.postsReducer.postsList);

    return /* postsList */ postsListStore.map((postItem) => {
        return (
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
                // signedUserName={signedUser.name}
            />
        );
    });
}

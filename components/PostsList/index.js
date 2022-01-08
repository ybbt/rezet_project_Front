import { useContext } from "react";

import { Post } from "../Post/index";

import signedUserContext from "../../context/signedUserContext";

export function PostsList({ postsList, onDeletePost, onUpdatePost }) {
    const [signedUser] = useContext(signedUserContext);
    return postsList.map((postItem) => {
        return (
            <Post
                post={postItem}
                key={postItem.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
                signedUserName={signedUser.name}
            />
        );
    });
}

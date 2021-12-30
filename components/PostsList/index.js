import { Post } from "../Post/index";

export function PostsList({
    postsList,
    onDeletePost,
    onUpdatePost,
    signedUser,
}) {
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

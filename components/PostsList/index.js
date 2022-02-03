import { Post } from "../Post/index";

import { useSelector } from "react-redux";

// import { useGetPostsListQuery } from "../../redux/api";

export function PostsList({ postsList, onDeletePost, onUpdatePost }) {
    return postsList ? (
        postsList.map((postItem) => {
            return (
                <Post
                    post={postItem}
                    key={postItem.id}
                    onDeletePost={onDeletePost}
                    onUpdatePost={onUpdatePost}
                />
            );
        })
    ) : (
        <div>null</div>
    );
}

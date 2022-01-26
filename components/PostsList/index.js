import { Post } from "../Post/index";

import { useSelector } from "react-redux";

// import { useGetPostsListQuery } from "../../redux/api";

export function PostsList({
    postsList,
    onDeletePost,
    onUpdatePost,
    // signedUser,
}) {
    // const postsListStore = useSelector((state) => state.postsReducer.postsList);

    // const { data, isError, error, isLoading } = useGetPostsListQuery();

    return postsList.map((postItem) => {
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

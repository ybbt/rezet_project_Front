import { PostComponent } from "../PostComponent/index";

export function PostListComponent({ postsList, onDeletePost }) {
    function handleDeletePost(post) {
        onDeletePost(post);
    }

    const postComponent = postsList.map((item) => {
        return (
            <PostComponent
                post={item}
                key={item.id}
                onDeletePost={handleDeletePost}
            />
        );
    });

    return <>{postComponent}</>;
}

import { useState } from "react";
import axios from "axios";
import { PostListComponent } from "../components/PostListComponent";
import { EditPostComponent } from "../components/EditPostComponent";
export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

    async function handleAddPost(postContent) {
        const response = await axios.post("http://127.0.0.1:8000/api/posts", {
            text: postContent,
        });

        setPosts([...posts, response.data.data]);
    }

    async function handleDeletePost(post) {
        // TODO Організувати адреси
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/posts/${post.id}`
        );

        if (response.status === 204) {
            const newPosts = posts.filter(
                (postItem) => postItem.id !== post.id
            );
            setPosts([...newPosts]);
        }
    }

    async function handleUpdatePost(post) {
        const response = await axios.put(
            `http://127.0.0.1:8000/api/posts/${post.id}`,
            {
                text: post.text,
            }
        );

        const postIndex = posts.findIndex(
            (postItem) => postItem.id === post.id
        );
        const newPostList = [...posts];
        newPostList[postIndex].text = post.text;

        setPosts([...newPostList]);
    }

    return (
        <>
            <h1>Whats up?</h1>
            <EditPostComponent onUpdate={handleAddPost} />
            <PostListComponent
                postsList={posts}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
            />
        </>
    );
}

export async function getStaticProps() {
    const res = await axios.get("http://127.0.0.1:8000/api/posts");

    return {
        props: { postsList: res.data.data },
    };
}

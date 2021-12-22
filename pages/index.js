import { useState } from "react";

import axiosInstance from "../libs/axiosInstance";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

    async function handleAddPost(postContent) {
        const response = await axiosInstance.post("/posts", {
            text: postContent,
        });

        setPosts([...posts, response.data.data]);
    }

    async function handleDeletePost(post) {
        await axiosInstance.delete(`/posts/${post.id}`);

        const newPosts = posts.filter((postItem) => postItem.id !== post.id);
        setPosts(newPosts);
    }

    async function handleUpdatePost(updatedData) {
        await axiosInstance.put(`/posts/${updatedData.id}`, updatedData);
        const newPostList = posts.map((postItem) =>
            postItem.id === updatedData.id
                ? { ...postItem, ...updatedData }
                : postItem
        );
        setPosts(newPostList);
    }

    return (
        <>
            <h1>Whats up?</h1>
            <EditPostForm onSave={handleAddPost} />
            <PostsList
                postsList={posts}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
            />
        </>
    );
}

export async function getStaticProps() {
    const res = await axiosInstance.get("/posts");

    return {
        props: { postsList: res.data.data },
    };
}

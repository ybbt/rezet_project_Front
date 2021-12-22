import { useState } from "react";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

    async function handleAddPost(postContent) {
        try {
            const response = await axiosInstance.post("/posts", {
                text: postContent,
            });

            setPosts([...posts, response.data.data]);
        } catch (error) {
            message.error(`${error.response.data.errors.text[0] || error}`);
            console.log(error.response.data.errors.text[0]);
        }
    }

    async function handleDeletePost(post) {
        try {
            const response = await axiosInstance.delete(`/posts/${post.id}`);

            const newPosts = posts.filter(
                (postItem) => postItem.id !== post.id
            );
            setPosts(newPosts);
        } catch {
            message.error(`${error.response.data.errors.text[0] || error}`);
            console.log(error);
        }
    }

    async function handleUpdatePost(updatedData) {
        try {
            const response = await axiosInstance.put(
                `/posts/${updatedData.id}`,
                {
                    text: updatedData.text,
                }
            );

            const newPostList = posts.map((postItem) =>
                postItem.id === updatedData.id
                    ? { ...postItem, ...updatedData }
                    : postItem
            );
            setPosts(newPostList);
        } catch (error) {
            console.log(error, "error");
            message.error(`${error.response.data.errors.text[0] || error}`);
        }
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

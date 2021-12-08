import { useState } from "react";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import { PostsList } from "../components/PostsList";
import { EditPost } from "../components/EditPost";

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

    async function handleAddPost(postContent) {
        try {
            const response = await axiosInstance.post("/posts", {
                text: postContent,
            });

            setPosts([...posts, response.data.data]);
        } catch (error) {
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response);
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
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
            console.log(error.response);
        }
    }

    async function handleUpdatePost(post) {
        try {
            const response = await axiosInstance.put(`/posts/${post.id}`, {
                text: post.text,
            });

            const newPostList = [...posts];

            newPostList.map(function (postItem, index) {
                if (postItem.id === post.id) {
                    postItem.text = post.text;
                }
            });
            setPosts(newPostList);
        } catch (error) {
            console.log(error, "error");
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
        }
    }

    return (
        <>
            <h1>Whats up?</h1>
            <EditPost onSave={handleAddPost} />
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

import { useState } from "react";

import axiosInstance from "../libs/axiosInstance";
import { PostsList } from "../components/PostsList";
import { EditPost } from "../components/EditPost";

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

    async function handleAddPost(postContent) {
        const response = await axiosInstance.post("/posts", {
            text: postContent,
        });

        setPosts([...posts, response.data.data]);
    }

    async function handleDeletePost(post) {
        const response = await axiosInstance.delete(`/posts/${post.id}`);

        const newPosts = posts.filter((postItem) => postItem.id !== post.id);
        setPosts(newPosts);
    }

    async function handleUpdatePost(post) {
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

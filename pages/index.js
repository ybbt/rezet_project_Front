import { useState, useEffect } from "react";
import Link from "next/link";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import Cookies from "js-cookie";

import { PostsList } from "../components/PostsList";
import { EditPost } from "../components/EditPost";

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);
    const [signedUser, setSignedUser] = useState({});

    // console.log(posts);

    useEffect(async () => {
        const login_token = Cookies.get("token_mytweeter");
        console.log(login_token);
        if (login_token) {
            axiosInstance.interceptors.request.use((config) => {
                config.headers.Authorization = login_token
                    ? `Bearer ${login_token}`
                    : "";
                return config;
            });

            try {
                const result = await axiosInstance.get("/auth-user");

                let response = result.data;

                console.log(response);

                setSignedUser(result.data.data);
            } catch (error) {
                console.log("Token wrong, user don`t signed");
            }
        } else {
            console.log("Login Token is empty");
        }
    }, []);

    async function handleAddPost(postContent) {
        try {
            const response = await axiosInstance.post("/posts", {
                text: postContent,
                user_id: signedUser.id,
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

    const addPostComponent = Object.keys(signedUser).length ? (
        <div className="border-2 border-black border-t-0 p-2">
            <h1 className="text-xs">Whats up?</h1>
            <EditPost onSave={handleAddPost} />
        </div>
    ) : null;

    return (
        <div className="flex justify-center">
            <div className="">
                {/* <h1>Whats up?</h1>
            <EditPost onSave={handleAddPost} /> */}
                {addPostComponent}
                <PostsList
                    postsList={posts}
                    onDeletePost={handleDeletePost}
                    onUpdatePost={handleUpdatePost}
                    signedUser={signedUser}
                />
                <Link href="/login_test">
                    <a>Sign In</a>
                </Link>
                <Link href="/register">
                    <a>Sign Up</a>
                </Link>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const res = await axiosInstance.get("/posts");

    console.log(res.data, "posts");

    return {
        props: { postsList: res.data.data },
    };
}

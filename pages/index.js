import { useState, useEffect } from "react";
import Link from "next/link";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import Cookies from "js-cookie";

import { PostsList } from "../components/PostsList";
import { EditPost } from "../components/EditPost";

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);
    const [signedUser, setSignedUser] = useState({});

    // console.log(posts);

    useEffect(async () => {
        const login_token = Cookies.get("token_mytweeter");

        console.log(login_token); // **********
        console.log(error, "error"); // ***************

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
                // user_id: signedUser.id,
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

    const signBanner = !Object.keys(signedUser).length ? (
        <div className="w-full bg-blue-400 sticky bottom-0 h-14 flex justify-center items-center">
            <Link href="/login_test">
                <a className="bg-blue-400 border-white border-2 flex h-7 w-20 justify-center items-center text-white">
                    Sign In
                </a>
            </Link>
            <Link href="/register">
                <a className="bg-white  text-blue-400 border-white border-2 flex h-7 w-20 justify-center items-center">
                    Sign Up
                </a>
            </Link>
        </div>
    ) : null;

    const postList = posts ? (
        <PostsList
            postsList={posts}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
            signedUser={signedUser}
        />
    ) : null;

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="max-w-3xl min-w-[45rem] flex flex-col">
                    {addPostComponent}
                    {/* <PostsList
                        postsList={posts}
                        onDeletePost={handleDeletePost}
                        onUpdatePost={handleUpdatePost}
                        signedUser={signedUser}
                    /> */}
                    {postList}
                </div>
            </div>

            {signBanner}
        </>
    );
}

export async function getStaticProps() {
    try {
        const res = await axiosInstance.get("/posts");

        console.log(res.data, "posts");

        return {
            props: { postsList: res.data.data, error: false },
        };
    } catch (error) {
        console.log(error.response, "error getStaticProps");
        return {
            props: {
                error: true,
                postsList: "",
            },
        };
    }
}

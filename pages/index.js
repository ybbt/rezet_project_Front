import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import classNames from "classnames";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import Cookies from "js-cookie";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { MainMenu } from "../components/MainMenu";
import { PageTemplate } from "../components/PageTemplate";
import { SignBanner } from "../components/SignBanner";
import { DropdownUserMenu } from "../components/DropdownUserMenu";

import signedUserContext from "../context/signedUserContext";

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);
    const [signedUser, setSignedUser] = useState({});

    const [signedUserAppContext, setSignedUserAppContext] =
        useContext(signedUserContext);

    useEffect(async () => {
        try {
            const result = await axiosInstance.get("/authme");

            const response = result.data;

            // console.log(response, "reponse");

            setSignedUser(result.data.data);
            setSignedUserAppContext(result.data.data);
        } catch (error) {
            console.log(error);
            console.log("Token wrong, user don`t signed");
            Cookies.remove("token_mytweeter");
        }
    }, []);

    async function handleAddPost(postContent) {
        // console.log(postContent);
        try {
            const response = await axiosInstance.post("/posts", {
                text: postContent,
                // user_id: signedUser.id,
            });

            setPosts([...posts, response.data.data]);
        } catch (error) {
            message.error(`${error}`);
            console.log(error, "error addpost");
        }
    }

    async function handleDeletePost(post) {
        try {
            const response = await axiosInstance.delete(`/posts/${post.id}`);

            const newPosts = posts.filter(
                (postItem) => postItem.id !== post.id
            );
            setPosts(newPosts);
        } catch (error) {
            message.error(`${error.response}`);
            console.log(error);
        }
    }

    async function handleUpdatePost(updatedData) {
        try {
            const login_token = Cookies.get("token_mytweeter");
            axiosInstance.interceptors.request.use((config) => {
                config.headers.Authorization = login_token
                    ? `Bearer ${login_token}`
                    : "";
                return config;
            });

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
            message.error(`${error}`);
        }
    }

    async function handlerLogout() {
        try {
            const login_token = Cookies.get("token_mytweeter");
            axiosInstance.interceptors.request.use((config) => {
                config.headers.Authorization = login_token
                    ? `Bearer ${login_token}`
                    : "";
                return config;
            });

            await axiosInstance.post(`/logout`);

            Cookies.remove("token_mytweeter");

            setSignedUser({});
            setSignedUserAppContext({});
        } catch (error) {
            console.log(error, "error");
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
        }
    }

    const addPostComponent = !!Object.keys(signedUserAppContext).length && (
        <EditPostForm onSave={handleAddPost} />
    );

    const signBanner = !Object.keys(signedUserAppContext).length && (
        <SignBanner />
    );

    const userBannerDropdown = !!Object.keys(signedUserAppContext).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <DropdownUserMenu
                user={signedUserAppContext}
                onLogout={handlerLogout}
            />
        </div>
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-center pl-4">
                Explore
            </header>
            {addPostComponent}
            <PostsList
                postsList={posts}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
                signedUser={signedUserAppContext}
            />
        </PageTemplate>
    );
}

export async function getStaticProps() {
    try {
        const res = await axiosInstance.get("/posts");

        // console.log(res.data, "posts");

        return {
            props: { postsList: res.data.data, error: false },
        };
    } catch (error) {
        console.log(error.response, "error getStaticProps");
        return {
            props: {
                error: true,
                // postsList: "",
            },
        };
    }
}

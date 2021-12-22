import { useRouter } from "next/router";
import { useState, /* useEffect, */ useContext } from "react";

import axiosInstance from "../../libs/axiosInstance";
import Cookies from "js-cookie";

import { message } from "antd";

import signedUserContext from "../../context/signedUserContext";

import { PageTemplate } from "../../components/PageTemplate";
import { SignBanner } from "../../components/SignBanner";
import { MainMenu } from "../../components/MainMenu";
import { DropdownUserMenu } from "../../components/DropdownUserMenu";
import { PostsList } from "../../components/PostsList";

export default ({ user, posts }) => {
    const [signedUserAppContext, setSignedUserAppContext] =
        useContext(signedUserContext);

    const router = useRouter();

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

    async function handleUpdatePost(post) {
        try {
            const login_token = Cookies.get("token_mytweeter");
            axiosInstance.interceptors.request.use((config) => {
                config.headers.Authorization = login_token
                    ? `Bearer ${login_token}`
                    : "";
                return config;
            });

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

            // setSignedUser({});
            setSignedUserAppContext({});
        } catch (error) {
            console.log(error, "error");
            message.error(`${error}`);
        }
    }

    const signBanner = !Object.keys(signedUserAppContext).length && (
        <SignBanner />
    );

    // console.log(signedUserContext, "signedUserContext id");

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
            <PostsList
                postsList={posts}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
                signedUser={signedUserAppContext}
            />
        </PageTemplate>
    );
};

export async function getServerSideProps /* getStaticProps */({ params }) {
    console.log(params.id, "serverSideProps new");

    const resultUser = await axiosInstance.get(`/users/${params.id}`);
    const resultUserPosts = await axiosInstance.get(
        `/users/${params.id}/posts`
    );

    console.log(resultUser.data, "resultUser");
    console.log(resultUserPosts.data, "resultUserPosts");

    return {
        props: {
            user: resultUser.data,
            posts: resultUserPosts.data,
        },
    };
}

import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import axiosInstance from "../../libs/axiosInstance";
import Cookies from "js-cookie";

import { message } from "antd";
import "antd/dist/antd.css";

import signedUserContext from "../../context/signedUserContext";

import { PageTemplate } from "../../components/PageTemplate";
import { SignBanner } from "../../components/SignBanner";
import { MainMenu } from "../../components/MainMenu";
import { DropdownUserMenu } from "../../components/DropdownUserMenu";
import { PostsList } from "../../components/PostsList";
import { EditPostForm } from "../../components/EditPostForm";
import { UserWrapper } from "../../components/UserWrapper";

export default ({ user, postsList }) => {
    const [posts, setPosts] = useState(postsList);
    const [signedUserAppContext, setSignedUserAppContext] =
        useContext(signedUserContext);

    const router = useRouter();

    // console.log(postsList, "postsList in page [id]");

    useEffect(async () => {
        try {
            const result = await axiosInstance.get("/authme");

            const response = result.data;

            // console.log(response, "reponse");

            // setSignedUser(result.data.data);
            setSignedUserAppContext(result.data.data);
        } catch (error) {
            console.log(error);
            console.log("Token wrong, user don`t signed");
            Cookies.remove("token_mytweeter");
        }
    }, []);

    useEffect(() => {
        setPosts(postsList);
    }, [postsList]);

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
            message.error(`${error}`);
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

    const addPostComponent = user.id === signedUserAppContext.id && (
        <EditPostForm onSave={handleAddPost} />
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu isAuth={!!Object.keys(signedUserAppContext).length} />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12  flex flex-col justify-center pl-4">
                <div className="font-bold text-lg">{`${user.first_name} ${
                    user.last_name || ""
                }`}</div>
                <div className="text-xs text-[#949494]">{`${postsList.length} posts`}</div>
            </header>
            <div className="h-64 w-full border border-[#949494] border-t-0">
                <UserWrapper user={user} />
            </div>
            {addPostComponent}
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
    // console.log(params, "serverSideProps new");

    const resultUser = await axiosInstance.get(`/users/${params.id}`);
    const resultUserPosts = await axiosInstance.get(
        `/users/${params.id}/posts`
    );

    // console.log(resultUser.data, "resultUser");
    // console.log(resultUserPosts.data, "resultUserPosts");

    // console.log("page [id] getServerSideProps");

    return {
        props: {
            user: resultUser.data.data,
            postsList: resultUserPosts.data.data,
        },
    };
}

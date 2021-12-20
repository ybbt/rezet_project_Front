import { useState, useEffect /* useContext */ } from "react";
import Link from "next/link";

import classNames from "classnames";

// import AppContext from "../AppContext";

import { message } from "antd";
import "antd/dist/antd.css";

import axiosInstance from "../libs/axiosInstance";
import Cookies from "js-cookie";

import { PostsList } from "../components/PostsList";
import { EditPost } from "../components/EditPost";
import { MainMenu } from "../components/MainMenu";
// import { UserBanner } from "../components/UserBanner";
import { DropdownUserMenu } from "../components/DropdownUserMenu";

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);
    const [signedUser, setSignedUser] = useState({});

    // console.log(postsList, "postList");
    // console.log(posts, "posts");

    useEffect(async () => {
        try {
            const result = await axiosInstance.get("/authme");

            const response = result.data;

            console.log(response);

            setSignedUser(result.data.data);
            // setSignUserContext(result.data.data);
        } catch (error) {
            console.log(error);
            console.log("Token wrong, user don`t signed");
            Cookies.remove("token_mytweeter");
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

            setSignedUser({});
        } catch (error) {
            console.log(error, "error");
            message.error(
                `${error.response.data.message} - ${error.response.data.errors.text[0]}`
            );
        }
    }

    const addPostComponent = !!Object.keys(signedUser).length && (
        <div className="border-2 border-black border-t-0 p-2">
            <EditPost onSave={handleAddPost} />
        </div>
    );

    const signBanner = !Object.keys(signedUser).length && (
        <div className="w-full bg-[#54C1FF] sticky bottom-0 h-14 flex items-center xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
            <div className="flex justify-between max-w-[800px] min-w-[600px] w-3/5 h-full ">
                <div className="flex flex-col">
                    <div className="text-xl text-white text-bold">
                        Stay tuned!
                    </div>
                    <div className="text-sm text-white ">
                        Sing up for Twitty! Or sign in if you already have an
                        account.
                    </div>
                </div>
                <div className="flex justify-between items-center w-[175px]">
                    <Link href="/login">
                        <a className="bg-[#54C1FF] border-white border-2 flex h-7 w-20 justify-center items-center text-white">
                            Sign In
                        </a>
                    </Link>
                    <Link href="/register">
                        <a className="bg-white  text-[#54C1FF] border-white border-2 flex h-7 w-20 justify-center items-center">
                            Sign Up
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );

    const userBanner = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            {/* <UserBanner user={signedUser} onLogout={handlerLogout} /> */}
            <DropdownUserMenu
                user={signedUser}
                onLogout={handlerLogout} /* onProfile={handlerProfiler} */
            />
        </div>
    );

    const leftSizeHeight = !!Object.keys(signedUser).length ? "h-full" : "";

    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                    <div className="max-w-[800px] min-w-[600px] w-3/5 h-full flex flex-col ">
                        <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                            <MainMenu />
                        </div>
                        {userBanner}
                        {addPostComponent}
                        <PostsList
                            postsList={posts}
                            onDeletePost={handleDeletePost}
                            onUpdatePost={handleUpdatePost}
                            signedUser={signedUser}
                        />
                    </div>
                </div>
                {signBanner}
            </div>
        </>
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

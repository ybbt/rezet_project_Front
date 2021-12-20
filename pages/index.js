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

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);
    const [signedUser, setSignedUser] = useState({});

    // console.log(postsList, "postList");
    // console.log(posts, "posts");

    useEffect(async () => {
        // const login_token = Cookies.get("token_mytweeter");

        // alert(login_token);

        // if (login_token) {
        // axiosInstance.interceptors.request.use((config) => {
        //     // config.headers.Authorization = login_token
        //     //     ? `Bearer ${login_token}`
        //     //     : "";
        //     // return config;
        //     config.headers.common = {
        //         ...config.headers.common,
        //         Authorization: `Bearer ${login_token}`,
        //     };
        //     return config;
        // });

        // axiosInstance.defaults.headers.authorization = `Bearer ${login_token}`;

        try {
            const result = await axiosInstance.get("/auth-user");

            const response = result.data;

            console.log(response);

            setSignedUser(result.data.data);
            // setSignUserContext(result.data.data);
        } catch (error) {
            console.log(error);
            console.log("Token wrong, user don`t signed");
            Cookies.remove("token_mytweeter");
        }
        // } else {
        //     console.log("Login Token is empty");
        // }
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
        <div className="w-full bg-blue-400 sticky bottom-0 h-14 flex justify-center items-center">
            <Link href="/login">
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
    );

    const userBanner = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <div>{signedUser.name}</div>
            <button onClick={handlerLogout}>Logout</button>
        </div>
    );

    const leftSizeHeight = !!Object.keys(signedUser).length ? "h-full" : "";

    const leftPanel = classNames(
        "w-1/5 min-w-40 sticky top-0 flex-grow flex flex-col justify-between items-end pt-10 pr-8 pb-4 self-start",
        // { "h-[calc(100vh_-_3.5rem)]": !Object.keys(signedUser).length },
        { "h-screen": !!Object.keys(signedUser).length }
    );
    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                    <div className="max-w-[50rem] min-w-[40rem] w-3/5 h-full flex flex-col grow-[2]">
                        <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray">
                            MENU
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

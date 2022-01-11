import { useState, useEffect, useContext } from "react";

import { message } from "antd";
import "antd/dist/antd.css";

import {
    getHomePosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";
import { fetchAuth, fetchSignOut } from "../libs/authorizeService";

import Cookies from "js-cookie";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { MainMenu } from "../components/MainMenu";
import { PageTemplate } from "../components/PageTemplate";
import { SignBanner } from "../components/SignBanner";
import { UserBanner } from "../components/UserBanner";

import signedUserContext from "../context/signedUserContext";

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);
    const [isLoaded, setIsLoaded] = useState(false);

    const [signedUser, setSignedUser] = useContext(signedUserContext);

    useEffect(async () => {
        try {
            const result = await fetchAuth();

            const response = result.data;

            setSignedUser(result.data.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Cookies.remove("token_mytweeter");
                setSignedUser({});
            } else {
                console.log(error);
                message.error(`${error}`);
            }
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        error && message.error(`${error}`);
    });

    async function handleAddPost(postContent) {
        try {
            const response = await sendPost(postContent);

            setPosts([response.data.data, ...posts]);
        } catch (error) {
            message.error(`${error}`);
            console.log(error, "error addpost");
        }
    }

    async function handleDeletePost(post) {
        try {
            const response = await deletePost(post.id);

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
            const response = await updatePost(
                updatedData.id,
                updatedData.content
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
            await fetchSignOut();

            Cookies.remove("token_mytweeter");

            setSignedUser({});
        } catch (error) {
            console.log(error, "error");
            message.error(`${error}`);
        }
    }

    const addPostComponent = !!Object.keys(signedUser).length && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} />
        </div>
    );

    const signBanner = !Object.keys(signedUser).length && isLoaded && (
        <SignBanner />
    );

    const userBannerDropdown = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner onLogout={handlerLogout} />
        </div>
    );

    const postsComponentList = posts && (
        <PostsList
            postsList={posts}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
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
            {postsComponentList}
        </PageTemplate>
    );
}

export async function getStaticProps() {
    try {
        const res = await getHomePosts();

        return {
            props: { postsList: res.data.data },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}

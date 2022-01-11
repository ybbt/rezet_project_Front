import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import {
    getUserPosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";
import { fetchAuth, fetchSignOut } from "../libs/authorizeService";
import { getUser } from "../libs/userService";

import Cookies from "js-cookie";

import { message } from "antd";
import "antd/dist/antd.css";

import signedUserContext from "../context/signedUserContext";

import { PageTemplate } from "../components/PageTemplate";
import { SignBanner } from "../components/SignBanner";
import { MainMenu } from "../components/MainMenu";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { UserWrapper } from "../components/UserWrapper";
import { UserBanner } from "../components/UserBanner";

export default ({ error, user, postsList }) => {
    const [posts, setPosts] = useState(postsList);
    const [isLoaded, setIsLoaded] = useState(false);
    const [signedUser, setSignedUser] = useContext(signedUserContext);

    const router = useRouter();

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

    useEffect(() => {
        setPosts(postsList);
    }, [postsList]);

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
            message.error(`${error}`);
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

    const signBanner = !Object.keys(signedUser).length && isLoaded && (
        <SignBanner />
    );

    const userBannerDropdown = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner onLogout={handlerLogout} />
        </div>
    );

    const addPostComponent = user.name === signedUser.name && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} />
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
            {postsComponentList}
        </PageTemplate>
    );
};

export async function getServerSideProps({ params }) {
    try {
        const result = await Promise.all([
            getUser(params.name),
            getUserPosts(params.name),
        ]);

        return {
            props: {
                user: result[0].data.data,
                postsList: result[1].data.data,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}

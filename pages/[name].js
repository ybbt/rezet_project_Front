import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import {
    getUserPosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";

import { getUser } from "../libs/userService";

import signedUserContext from "../context/signedUserContext";

import { PageLayout } from "../components/PageLayout";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { UserWrapper } from "../components/UserWrapper";

export default function userName({ error, user, postsList }) {
    const [posts, setPosts] = useState(postsList);

    const [{ signedUser, isLoaded }] = useContext(signedUserContext);

    const router = useRouter();

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
        <>
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
        </>
    );
}

userName.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
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

import { useState, useEffect, useContext } from "react";

import {
    getHomePosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";

import { PageLayout } from "../components/PageLayout";

import signedUserContext from "../context/signedUserContext";

export default function Index({ postsList, error }) {
    const [posts, setPosts] = useState(postsList);

    const [{ signedUser, isLoaded }] = useContext(signedUserContext);

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

    const addPostComponent = !!Object.keys(signedUser).length && (
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
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-center pl-4">
                Explore
            </header>
            {addPostComponent}
            {postsComponentList}
        </>
    );
}

Index.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
};

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

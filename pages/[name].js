import { useRouter } from "next/router";
import { useEffect } from "react";

// import { message } from "antd";
import "antd/dist/antd.css";

import { PageLayout } from "../components/PageLayout";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { UserWrapper } from "../components/UserWrapper";

import useAuthStatus from "../hooks/useAuthStatus";
import useErrorStore from "../hooks/useErrorStore";

import { useSelector, useDispatch } from "react-redux";

import { getUserAsync } from "../redux/activeUser/activeUserActions.js";

import {
    getUserPostsListAsync,
    newPostAsync,
    deletePostAsync,
    updatePostAsync,
} from "../redux/postsList/postsListActions.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

export default function userName({ error, user, postsList }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const postsListStore = useSelector((state) => state.postsReducer.postsList);

    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const activeUserStore = useSelector((state) => state.userReducer.user);

    async function handleAddPost(postContent) {
        await dispatch(newPostAsync(postContent));
    }

    async function handleDeletePost(post) {
        await dispatch(deletePostAsync(post));
    }

    async function handleUpdatePost(updatedData) {
        await dispatch(updatePostAsync(updatedData));
    }

    const addPostComponent = activeUserStore.name === signedUserStore.name && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} contentKind="post" />
        </div>
    );

    const postsComponentList = postsListStore && (
        <PostsList
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <div className="font-bold text-lg">
                    {`${activeUserStore.first_name} ${
                        activeUserStore.last_name || ""
                    }`}
                </div>
                <div className="text-xs text-[#949494]">{`${activeUserStore.posts_count} posts`}</div>
            </header>
            <div className="h-64 w-full border border-[#949494] border-t-0">
                <UserWrapper user={activeUserStore} />
            </div>
            {addPostComponent}
            {postsComponentList}
        </>
    );
}

userName.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
};

export const withRedux = (getServerSideProps) => async (ctx) => {
    const store = initializeStore();
    try {
        const result = await getServerSideProps(ctx, store);

        return {
            ...result,

            props: {
                initialReduxState: store.getState(),
                ...result.props,
            },
        };
    } catch (error) {
        return {
            props: {
                error: true,
            },
        };
    }
};

export const getServerSideProps = withRedux(async (context, store) => {
    try {
        /* const result =  */ await Promise.all([
            store.dispatch(getUserAsync(context.params.name)),
            store.dispatch(getUserPostsListAsync(context.params.name)),
        ]);

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        store.dispatch(setError(error.response, error.message));
    }
});

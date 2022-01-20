import { useEffect } from "react";

import "antd/dist/antd.css";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";

import { PageLayout } from "../components/PageLayout";

import { useSelector, useDispatch } from "react-redux";
import {
    getAllPostsListAsync,
    newPostAsync,
    deletePostAsync,
    updatePostAsync,
} from "../redux/postsList/postsListActions.js";

import useAuthStatus from "../hooks/useAuthStatus";
import useErrorStore from "../hooks/useErrorStore";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

export default function Index() {
    const dispatch = useDispatch();

    const postsListStore = useSelector((state) => state.postsReducer.postsList);

    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    async function handleAddPost(postContent) {
        await dispatch(newPostAsync(postContent));
    }

    async function handleDeletePost(post) {
        await dispatch(deletePostAsync(post));
    }

    async function handleUpdatePost(updatedData) {
        await dispatch(updatePostAsync(updatedData));
    }

    const addPostComponent = isAuthStore && (
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
                <span>Explore</span>
            </header>
            {addPostComponent}
            {postsComponentList}
        </>
    );
}

Index.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
};

export const withRedux = (getStaticProps) => async () => {
    const store = initializeStore();
    try {
        const result = await getStaticProps(store);

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

export const getStaticProps = withRedux(async (store) => {
    try {
        await store.dispatch(getAllPostsListAsync());
        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        store.dispatch(setError(error.response, error.message));
    }
});

import axiosInstance from "../libs/axiosInstance";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "antd/dist/antd.css";

import { PageLayout } from "../components/PageLayout";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { UserWrapper } from "../components/UserWrapper";

import useAuthStatus from "../hooks/useAuthStatus";
import useErrorStore from "../hooks/useErrorStore";

import { useSelector, useDispatch } from "react-redux";

import { setUserRedux } from "../redux/actions/activeUserActions.js";

import {
    setUserPostsRedux,
    sendPostRedux,
    deletePostRedux,
    updatePostRedux,
} from "../redux/actions/postsListActions.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

// **********************************

import {
    getPostsListByUsername,
    getUserByUsername,
    useAddPostMutation,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useGetPostsListByUsernameQuery,
    useGetUserByUsernameQuery,
    useGetActiveUserByToken,
    getRunningOperationPromises,
} from "../redux/api.js";

// **********************************

export default function userName({ user }) {
    const router = useRouter();

    const name = router.query.name;
    console.log(name);

    const [addPost] = useAddPostMutation();
    const [updatePost] = useUpdatePostByIdMutation();
    const [deletePost] = useDeletePostByIdMutation();

    const result = useGetPostsListByUsernameQuery(name);
    const { isLoading, error, data } = result;

    const resultActiveUser = useGetUserByUsernameQuery(name);
    const { /* isLoading, error, */ data: dataActiveUser } = resultActiveUser;

    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const stateStore = useSelector((state) => state);
    console.log(stateStore, "state in [name]");

    async function handleAddPost(postContent) {
        addPost({ data: { content: postContent } });
    }

    async function handleDeletePost(post) {
        deletePost({ id: post.id, name: post.author.name });
    }

    async function handleUpdatePost(updatedData) {
        updatePost({
            id: updatedData.id,
            data: { content: updatedData.content },
            name: updatedData.author.name,
        });
    }

    //!доки не поверну авторизацію через rtkq
    const addPostComponent = dataActiveUser &&
        dataActiveUser.data.name === signedUserStore.name /*  */ && (
            <div className="border border-t-0 border-[#949494] p-2">
                <EditPostForm onSave={handleAddPost} contentKind="post" />
            </div>
        );

    const postsComponentList = data && (
        <PostsList
            postsList={data.data}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <div className="font-bold text-lg">
                    {`${dataActiveUser && dataActiveUser.data.first_name} ${
                        (dataActiveUser && dataActiveUser.data.last_name) || ""
                    }`}
                </div>
                <div className="text-xs text-[#949494]">{`${
                    dataActiveUser && dataActiveUser.data.posts_count
                } posts`}</div>
            </header>
            <div className="h-64 w-full border border-[#949494] border-t-0">
                <UserWrapper user={dataActiveUser ? dataActiveUser.data : {}} />
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
        await Promise.all([
            store.dispatch(getUserByUsername.initiate(context.params.name)),
            store.dispatch(
                getPostsListByUsername.initiate(context.params.name)
            ),
        ]);
        await Promise.all(getRunningOperationPromises());

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        console.log(error, "error in getServerSideProps");
        store.dispatch(setErrorRedux(error.response, error.message));
        // return {
        //     props: {
        //         error: true,
        //     },
        // };
    }
});

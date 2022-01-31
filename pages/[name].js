import axiosInstance from "../libs/axiosInstance";
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

import { setUserRedux } from "../redux/actions/activeUserActions.js";

import {
    setUserPostsRedux,
    sendPostRedux,
    deletePostRedux,
    updatePostRedux,
} from "../redux/actions/postsListActions.js";

// import { authMeRedux } from "../redux/actions/authorizationActions.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

// **********************************
// import { wrapper } from "../redux/store";
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

// import { useRouter } from "next/dist/client/router";
// **********************************

export default function userName({ user /* , postsList */ }) {
    const router = useRouter();

    // const dispatch = useDispatch();
    // const postsListStore = useSelector((state) => state.postsReducer.postsList);

    // const {
    //     signedUser: signedUserStore,
    //     isAuth: isAuthStore,
    //     isLoad: isLoadStore,
    // } = useSelector((state) => state.authReducer);
    // const activeUserStore = useSelector((state) => state.userReducer.user);

    // const stateStore = useSelector((state) => state);
    // console.log(stateStore, "state in [name]");

    const name = router.query.name;
    console.log(name);

    const [addPost] = useAddPostMutation();
    const [updatePost] = useUpdatePostByIdMutation();
    const [deletePost] = useDeletePostByIdMutation();

    const result = useGetPostsListByUsernameQuery(name);
    const { isLoading, error, data } = result;

    // console.log(data && data.data, "data in [name]");

    const resultActiveUser = useGetUserByUsernameQuery(name);
    const { /* isLoading, error, */ data: dataActiveUser } = resultActiveUser;

    // console.log(
    //     dataActiveUser && dataActiveUser,
    //     "name of active user in [name]"
    // );

    const isAuthStore = useSelector((state) => state.authReducer.isAuth);
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const stateStore = useSelector((state) => state);
    console.log(stateStore, "state in [name]");

    async function handleAddPost(postContent) {
        // await dispatch(sendPostRedux(postContent));
        addPost({ data: { content: postContent } });
    }

    async function handleDeletePost(post) {
        // await dispatch(deletePostRedux(post));
        deletePost({ id: post.id, name: post.author.name });
    }

    async function handleUpdatePost(updatedData) {
        // await dispatch(updatePostRedux(updatedData));
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

    // const headerContent = (
    //     <>
    //         <div className="font-bold text-lg">{`${
    //             activeUserStore.first_name
    //         } ${activeUserStore.last_name || ""}`}</div>
    //         <div className="text-xs text-[#949494]">{`${activeUserStore.posts_count} posts`}</div>
    //     </>
    // );

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <div className="font-bold text-lg">
                    {`${
                        /* activeUserStore */ dataActiveUser &&
                        dataActiveUser.data.first_name
                    } ${
                        /* activeUserStore */ (dataActiveUser &&
                            dataActiveUser.data.last_name) ||
                        ""
                    }`}
                </div>
                <div className="text-xs text-[#949494]">{`${
                    /* activeUserStore */ dataActiveUser &&
                    dataActiveUser.data.posts_count
                } posts`}</div>
            </header>
            <div className="h-64 w-full border border-[#949494] border-t-0">
                <UserWrapper
                    user={
                        /* activeUserStore */ dataActiveUser
                            ? dataActiveUser.data
                            : {}
                    }
                />
            </div>
            {addPostComponent}
            {postsComponentList}
        </>
    );
}

userName.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
};

// *****************************
// export const getServerSideProps = wrapper.getStaticProps(
//     (store) => async (context) => {
//         const name = context.params?.name;
//         // const id = "1";
//         if (typeof id === "string") {
//             console.log(store, "store");
//             store.dispatch(getPostsListByUsername.initiate(name));
//         }

//         await Promise.all(getRunningOperationPromises());

//         return {
//             props: {},
//         };
//     }
// );
// *****************************

export const withoutAuth = (getServerSidePropsFunc) => {
    return async (ctx, ...args) => {
        // console.log(ctx, "context withoutAuth");
        // axiosInstance.setToken();
        // const { token } = ctx.req.cookies;

        // if (token) {
        //     axiosInstance.setToken(ctx.req.cookies?.token);

        //     try {
        //         return {
        //             redirect: {
        //                 destination: `/`,
        //             },
        //         };
        //     } catch (e) {
        //         return getServerSidePropsFunc
        //             ? await getServerSidePropsFunc(ctx, ...args)
        //             : { props: {} };
        //     }
        // }

        return getServerSidePropsFunc
            ? await getServerSidePropsFunc(ctx, ...args)
            : { props: {} };
        // return await getServerSidePropsFunc(null, ...args);
    };
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

export const getServerSideProps = withoutAuth(
    withRedux(async (context, store) => {
        try {
            /* const result =  */ await Promise.all([
                store.dispatch(
                    /* setUserRedux */ getUserByUsername.initiate(
                        context.params.name
                    )
                ),
                store.dispatch(
                    /* setUserPostsRedux */ getPostsListByUsername.initiate(
                        context.params.name
                    )
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
    })
);

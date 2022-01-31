import { useEffect } from "react";

// import { message } from "antd";
import "antd/dist/antd.css";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";

import { PageLayout } from "../components/PageLayout";

import { useSelector, useDispatch } from "react-redux";
import {
    setPostsRedux,
    sendPostRedux,
    deletePostRedux,
    updatePostRedux,
} from "../redux/actions/postsListActions.js";
// import { authMeRedux } from "../redux/actions/authorizationActions.js";

import useAuthStatus from "../hooks/useAuthStatus";
import useErrorStore from "../hooks/useErrorStore";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

// *******************************
// import { skipToken } from "@reduxjs/toolkit/query";
import {
    useGetPostsListQuery,
    useAddPostMutation,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    getPostsList,
    getRunningOperationPromises,
} from "../redux/api.js";

import { useRouter } from "next/dist/client/router"; //? ХЗ нафіга
import { api } from "../redux/api";
// ********************************

export default function Index() {
    const dispatch = useDispatch();

    const [addPost] = useAddPostMutation();
    const [updatePost] = useUpdatePostByIdMutation();
    const [deletePost] = useDeletePostByIdMutation();

    const {
        data: dataPostsList,
        // isSuccess: isSuccessPostsList,
        // isError: isErrorPostsList,
        // error: errorPostsList,
        // isLoading: isLoadingPostsList,
    } = useGetPostsListQuery();

    // console.log(data ?? "null");

    // const postsListStore = useSelector((state) => state.postsReducer.postsList);

    // const router = useRouter();
    // const name = router.query.name;
    // const name = "10";
    // const result = useGetPostByIdQuery(
    //     typeof name === "string" ? name : skipToken,
    //     {
    //         // If the page is not yet generated, router.isFallback will be true
    //         // initially until getStaticProps() finishes running
    //         skip: router.isFallback,
    //     }
    // );
    // const { isLoading, error, data } = result;

    // --- Використання без хука (мені ререндерс)
    // dispatch(api.endpoints.getPostById.initiate());
    // const state = useSelector((state) => state);
    // const result = api.endpoints.getPostById.select("10")(state);
    // const { data, isLoading, status, error } = result;
    // console.log(result, "result");
    // --- -----------------------

    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const stateStore = useSelector((state) => state);
    console.log(stateStore, "state in index");

    async function handleAddPost(postContent) {
        // await dispatch(sendPostRedux(postContent));
        addPost({ /* dataPostsList */ data: { content: postContent } });
    }

    async function handleDeletePost(post) {
        // await dispatch(deletePostRedux(post));
        deletePost({ id: post.id });
    }

    async function handleUpdatePost(updatedData) {
        // await dispatch(updatePostRedux(updatedData));
        updatePost({
            id: updatedData.id,
            data: { content: updatedData.content },
        });
    }

    //! поки нема авторизації через rtkq
    const addPostComponent = isAuthStore && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} contentKind="post" />
        </div>
    );

    const postsComponentList = dataPostsList && (
        <PostsList
            postsList={dataPostsList.data}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    // const headerContent = <span>Explore</span>;

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <span>Explore</span>
            </header>
            {addPostComponent}

            {postsComponentList}
            {/* <div>
                {error ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <>Loading...</>
                ) : data ? (
                    <>
                        <div>{data.data.content}</div>
                        <img
                            src={data.data.author.avatar_path}
                            alt={"data.species.name"}
                        />
                    </>
                ) : null}
                hi
            </div> */}
        </>
    );
}

Index.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>;
};

// export const getStaticProps = wrapper.getStaticProps(
//     (store) => async (context) => {
//         // const id = context.params?.id;
//         // const id = "10";
//         if (typeof id === "string") {
//             // console.log(store, "store");
//             store.dispatch(getPostsList.initiate());
//         }

//         await Promise.all(getRunningOperationPromises());

//         return {
//             props: {},
//         };
//     }
// );

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
        await store.dispatch(getPostsList.initiate() /* setPostsRedux() */);
        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        console.log(error, "Error in getStaticProps");
        store.dispatch(setErrorRedux(error.response, error.message));
        return {
            props: {
                error: true,
            },
        };
    }
});

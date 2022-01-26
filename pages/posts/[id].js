import { useEffect } from "react";

import Link from "next/link";

import { Space } from "antd";
import "antd/dist/antd.css";

import { getPost } from "../../libs/postService";
import { getPostComments } from "../../libs/commentService";

import { PageLayout } from "../../components/PageLayout";
import { CommentsList } from "../../components/CommentsList";
import { Post } from "../../components/Post";
import { EditPostForm } from "../../components/EditPostForm";

import useAuthStatus from "../../hooks/useAuthStatus";
import useErrorStore from "../../hooks/useErrorStore";

import { useSelector, useDispatch } from "react-redux";

import {
    setActivePostRedux,
    updateActivePostRedux,
    deleteActivePostRedux,
} from "../../redux/actions/activePostActions.js";

import {
    setPostCommentsRedux,
    sendCommentRedux,
    updateCommentRedux,
    deleteCommentRedux,
} from "../../redux/actions/commentsListActions.js";

// import { authMeRedux } from "../../redux/actions/authorizationActions.js";

import { initializeStore } from "../../redux/store"; // ---  для серверного запросу

// **********************************
import { useGetPostByIdQuery } from "../../redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { wrapper } from "../../redux/store";
import {
    getPostById,
    //   getPokemonList,
    getRunningOperationPromises,
} from "../../redux/api.js";

import { useRouter } from "next/dist/client/router"; //? ХЗ нафіга
// **********************************

export default function userPost() {
    const dispatch = useDispatch();
    // const commentsListStore = useSelector(
    //     (state) => state.commentsReducer.commentsList
    // );
    // const postStore = useSelector((state) => state.postReducer.activePost);

    // const {
    //     signedUser: signedUserStore,
    //     isAuth: isAuthStore,
    //     isLoad: isLoadStore,
    // } = useSelector((state) => state.authReducer);

    // ****************************************
    const router = useRouter();

    const id = router.query.id;

    const result = useGetPostByIdQuery(
        id
        /* typeof id === "string" ? id : skipToken,
        {
            // If the page is not yet generated, router.isFallback will be true
            // initially until getStaticProps() finishes running
            skip: router.isFallback,
        } */
    );
    const { isLoading, error, data } = result;
    console.log(data.data.comments_count, "data");
    // ****************************************

    async function handleDeletePost(post) {
        await dispatch(deleteActivePostRedux(post));
    }

    async function handleUpdatePost(updatedData) {
        await dispatch(updateActivePostRedux(updatedData));
    }

    async function handleAddComment(commentContent) {
        await dispatch(sendCommentRedux(postStore.id, commentContent));
    }

    async function handleUpdateComment(updatedData) {
        await dispatch(updateCommentRedux(updatedData));
    }

    async function handleDeleteComment(comment) {
        await dispatch(deleteCommentRedux(comment));
    }

    // const commentsComponentList = commentsListStore && (
    //     <CommentsList
    //         onDeleteComment={handleDeleteComment}
    //         onUpdateComment={handleUpdateComment}
    //     />
    // );

    // const addCommentComponent = !!isAuthStore && (
    //     <div className="border border-t-0 border-[#949494] p-2 ">
    //         <EditPostForm onSave={handleAddComment} contentKind="comment" />
    //     </div>
    // );

    // const beTheFirstSigninSignUpComponent = !isAuthStore && (
    //     <>
    //         <Link href={`/register`}>
    //             <a>Sign Up</a>
    //         </Link>
    //         or
    //         <Link href={`/login`}>
    //             <a>Sign In</a>
    //         </Link>
    //     </>
    // );

    // const beTheFirstComponent = !postStore.comments_count && (
    //     <Space className="border border-[#949494] border-t-0 p-3">
    //         No comments yet... Be the first!
    //         {beTheFirstSigninSignUpComponent}
    //     </Space>
    // );

    const postComponent = data && (
        <Post
            post={data.data}
            key={data.data.id}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    // const headerContent = (
    //     <>
    //         <div>Thread</div>
    //         <div className="text-xs text-[#949494]">{`${postStore.comments_count} replies`}</div>
    //     </>
    // );

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <div>Thread</div>
                <div className="text-xs text-[#949494]">{`${data.data.comments_count} replies`}</div>
            </header>
            {postComponent}
            {/* {addCommentComponent}
            <div className="h-10 border border-[#949494] border-t-0"></div>
            {beTheFirstComponent}
            {commentsComponentList} */}
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
            </div> */}
        </>
    );
}

// *****************************
export const getServerSideProps = wrapper.getStaticProps(
    (store) => async (context) => {
        const id = context.params?.id;
        // const id = "1";
        if (typeof id === "string") {
            console.log(store, "store");
            store.dispatch(getPostById.initiate(id));
        }

        await Promise.all(getRunningOperationPromises());

        return {
            props: {},
        };
    }
);
// *****************************

// userPost.getLayout = function getLayout(page) {
//     return <PageLayout>{page}</PageLayout>;
// };

// export const withRedux = (getServerSideProps) => async (ctx) => {
//     const store = initializeStore();
//     try {
//         const result = await getServerSideProps(ctx, store);

//         return {
//             ...result,
//             props: {
//                 initialReduxState: store.getState(),
//                 ...result.props,
//             },
//         };
//     } catch (error) {
//         return {
//             props: {
//                 error: true,
//             },
//         };
//     }
// };

// export const getServerSideProps = withRedux(async (context, store) => {
//     try {
//         const result = await Promise.all([
//             store.dispatch(setActivePostRedux(context.params.id)),
//             store.dispatch(setPostCommentsRedux(context.params.id)),
//         ]);

//         const res = JSON.parse(JSON.stringify(result));

//         return {
//             props: {
//                 message: "hello world",
//             },
//         };
//     } catch (error) {
//         store.dispatch(setErrorRedux(error.response, error.message));
//         // return {
//         //     props: {
//         //         error: error.message,
//         //     },
//         // };
//     }
// });

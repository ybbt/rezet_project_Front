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
import {
    useGetPostByIdQuery,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useGetCommentsListByPostidQuery,
    useAddCommentByPostidMutation,
    useUpdateCommentByIdMutation,
    useDeleteCommentByIdMutation,
    getPostById,
    getCommentsListByPostid,
    getRunningOperationPromises,
} from "../../redux/api";
// import { skipToken } from "@reduxjs/toolkit/query";
import { wrapper } from "../../redux/store";

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
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    // ****************************************
    const router = useRouter();

    const postId = router.query.id;

    const [updatePost] = useUpdatePostByIdMutation();
    const [deletePost] = useDeletePostByIdMutation();
    const [addComment] = useAddCommentByPostidMutation();
    const [updateComment] = useUpdateCommentByIdMutation();
    const [deleteComment] = useDeleteCommentByIdMutation();

    const resultPost = useGetPostByIdQuery(postId);
    const resultCommensList = useGetCommentsListByPostidQuery(postId);

    const {
        /* isLoading: isLoadingPost, */ isError: isErrorPost,
        data: dataPost,
    } = resultPost;
    const { /* isLoading, isError, */ data: dataComments } = resultCommensList;
    // console.log(dataPost.data.id, "data");
    // ****************************************

    async function handleDeletePost(post) {
        // await dispatch(deleteActivePostRedux(post));
        const { error } = await deletePost({ id: post.id });
        !error && router.push("/");
    }

    async function handleUpdatePost(updatedData) {
        // await dispatch(updateActivePostRedux(updatedData));
        updatePost({
            id: updatedData.id,
            data: { content: updatedData.content },
        });
    }

    async function handleAddComment(commentContent) {
        // await dispatch(sendCommentRedux(postStore.id, commentContent));
        addComment({
            postId: dataPost.data.id,
            data: { content: commentContent },
        });
    }

    async function handleUpdateComment(updatedData) {
        console.log(updatedData, "updatedData");
        // await dispatch(updateCommentRedux(updatedData));
        updateComment({
            id: updatedData.id,
            data: { content: updatedData.content },
            postId,
        });
    }

    async function handleDeleteComment(comment) {
        // await dispatch(deleteCommentRedux(comment));
        deleteComment({ id: comment.id, postId });
    }

    const commentsComponentList = dataComments && (
        <CommentsList
            commentsList={dataComments.data}
            onDeleteComment={handleDeleteComment}
            onUpdateComment={handleUpdateComment}
        />
    );

    const addCommentComponent = !!isAuthStore && (
        <div className="border border-t-0 border-[#949494] p-2 ">
            <EditPostForm onSave={handleAddComment} contentKind="comment" />
        </div>
    );

    const beTheFirstSigninSignUpComponent = !isAuthStore && (
        <>
            <Link href={`/register`}>
                <a>Sign Up</a>
            </Link>
            or
            <Link href={`/login`}>
                <a>Sign In</a>
            </Link>
        </>
    );

    const beTheFirstComponent = dataPost && !dataPost.data.comments_count && (
        <Space className="border border-[#949494] border-t-0 p-3">
            No comments yet... Be the first!
            {beTheFirstSigninSignUpComponent}
        </Space>
    );

    const postComponent = dataPost && (
        <Post
            post={dataPost.data}
            key={dataPost.data.id}
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
                <div className="text-xs text-[#949494]">{`${dataPost?.data.comments_count} replies`}</div>
            </header>
            {postComponent}
            {addCommentComponent}
            <div className="h-10 border border-[#949494] border-t-0"></div>
            {beTheFirstComponent}
            {commentsComponentList}
        </>
    );
}

// *****************************
// export const getServerSideProps = wrapper.getStaticProps(
//     (store) => async (context) => {
//         const id = context.params?.id;
//         // const id = "1";
//         if (typeof id === "string") {
//             // console.log(getPostById, "getPostById");
//             store.dispatch(getPostById.initiate(id));
//             store.dispatch(getCommentsListByPostid.initiate(id));
//         }

//         await Promise.all(getRunningOperationPromises());

//         return {
//             props: {},
//         };
//     }
// );
// *****************************

userPost.getLayout = function getLayout(page) {
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
        const result = await Promise.all([
            store.dispatch(
                /* setActivePostRedux */ getPostById.initiate(context.params.id)
            ),
            store.dispatch(
                /* setPostCommentsRedux */ getCommentsListByPostid.initiate(
                    context.params.id
                )
            ),
        ]);

        const res = JSON.parse(JSON.stringify(result));

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        store.dispatch(setErrorRedux(error.response, error.message));
        // return {
        //     props: {
        //         error: error.message,
        //     },
        // };
    }
});

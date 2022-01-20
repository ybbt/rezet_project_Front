import { useEffect } from "react";

import Link from "next/link";

import { Space } from "antd";
import "antd/dist/antd.css";

import { getPostService } from "../../libs/postService";
import { getPostCommentsService } from "../../libs/commentService";

import { PageLayout } from "../../components/PageLayout";
import { CommentsList } from "../../components/CommentsList";
import { Post } from "../../components/Post";
import { EditPostForm } from "../../components/EditPostForm";

import useAuthStatus from "../../hooks/useAuthStatus";
import useErrorStore from "../../hooks/useErrorStore";

import { useSelector, useDispatch } from "react-redux";

import {
    getActivePostAsinc,
    updateActivePostAsync,
    deleteActivePostAsync,
} from "../../redux/activePost/activePostActions.js";

import {
    getCommentsListAsync,
    newCommentAsync,
    updateCommentAsync,
    deleteCommentAsync,
} from "../../redux/commentsList/commentsListActions.js";

import Router from "next/router";

import { initializeStore } from "../../redux/store";

export default function userPost() {
    const dispatch = useDispatch();
    const commentsListStore = useSelector(
        (state) => state.commentsReducer.commentsList
    );
    const postStore = useSelector((state) => state.postReducer.activePost);
    const isDelitedStore = useSelector((state) => state.postReducer.isDelited);

    const {
        signedUser: signedUserStore,
        isAuth: isAuthStore,
        isLoad: isLoadStore,
    } = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (isDelitedStore) {
            Router.push("/");
        }
    }, [isDelitedStore]);

    async function handleDeletePost(post) {
        await dispatch(deleteActivePostAsync(post));
    }

    async function handleUpdatePost(updatedData) {
        await dispatch(updateActivePostAsync(updatedData));
    }

    async function handleAddComment(commentContent) {
        await dispatch(newCommentAsync(postStore.id, commentContent));
    }

    async function handleUpdateComment(updatedData) {
        await dispatch(updateCommentAsync(updatedData));
    }

    async function handleDeleteComment(comment) {
        await dispatch(deleteCommentAsync(comment));
    }

    const commentsComponentList = commentsListStore && (
        <CommentsList
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

    const beTheFirstComponent = postStore && !postStore.comments_count && (
        <Space className="border border-[#949494] border-t-0 p-3">
            No comments yet... Be the first!
            {beTheFirstSigninSignUpComponent}
        </Space>
    );

    const postComponent = postStore && (
        <Post
            post={postStore}
            key={postStore.id}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    return (
        <>
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                <div>Thread</div>
                <div className="text-xs text-[#949494]">{`${postStore.comments_count} replies`}</div>
            </header>
            {postComponent}
            {addCommentComponent}
            <div className="h-10 border border-[#949494] border-t-0"></div>
            {beTheFirstComponent}
            {commentsComponentList}
        </>
    );
}

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
            store.dispatch(getActivePostAsinc(context.params.id)),
            store.dispatch(getCommentsListAsync(context.params.id)),
        ]);

        const res = JSON.parse(JSON.stringify(result));

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        store.dispatch(setError(error.response, error.message));
    }
});

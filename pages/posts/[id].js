import { useEffect } from "react";

import Link from "next/link";

import { Space } from "antd";
import "antd/dist/antd.css";

import { getPost } from "../../libs/postService";
import { getPostComments } from "../../libs/commentService";

import { PageTemplate } from "../../components/PageTemplate";
import { SignBanner } from "../../components/SignBanner";
import { UserBanner } from "../../components/UserBanner";
import { MainMenu } from "../../components/MainMenu";
import { CommentsList } from "../../components/CommentsList";
import { Post } from "../../components/Post";
import { EditPostForm } from "../../components/EditPostForm";

import useAuthStatus from "../../hooks/useAuthStatus";

// ********
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

import {
    authMeRedux,
    // logoutRedux,
} from "../../redux/actions/authorizationActions.js";

import { initializeStore } from "../../redux/store"; // ---  для серверного запросу

export default () => {
    const dispatch = useDispatch();
    const commentsListStore = useSelector(
        (state) => state.commentsReducer.commentsList
    );
    const postStore = useSelector((state) => state.postReducer.activePost);
    // const signedUserStore = useSelector(
    //     (state) => state.authReducer.signedUser
    // );
    const {
        signedUser: signedUserStore,
        isAuth: isAuthStore,
        isLoad: isLoadStore,
    } = useSelector((state) => state.authReducer);

    const errorStore = useSelector((state) => state.errorReducer.error);
    const statusTextStore = useSelector(
        (state) => state.errorReducer.statusText
    );

    useAuthStatus();

    if (errorStore) {
        return <div>{statusTextStore}</div>;
    }

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

    // async function handlerLogout() {
    //     await dispatch(logoutRedux());
    // }

    const signBanner = !isAuthStore && isLoadStore && <SignBanner />;

    const userBannerDropdown = !!isAuthStore && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner /* onLogout={handlerLogout} */ />
        </div>
    );

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

    const beTheFirstComponent = !postStore.comments_count && (
        <Space className="border border-[#949494] border-t-0 p-3">
            No comments yet... Be the first!
            {beTheFirstSigninSignUpComponent}
        </Space>
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12 font-bold text-lg flex flex-col justify-center pl-4">
                Thread
                <div className="text-xs text-[#949494]">{`${postStore.comments_count} replies`}</div>
            </header>

            <Post
                post={postStore}
                key={postStore.id}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
            />

            {addCommentComponent}
            <div className="h-10 border border-[#949494] border-t-0"></div>
            {beTheFirstComponent}
            {commentsComponentList}
        </PageTemplate>
    );
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
            store.dispatch(setActivePostRedux(context.params.id)),
            store.dispatch(setPostCommentsRedux(context.params.id)),
        ]);

        const res = JSON.parse(JSON.stringify(result));

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        store.dispatch(setErrorRedux(error));

        return {
            props: {
                error: error.message,
            },
        };
    }
});

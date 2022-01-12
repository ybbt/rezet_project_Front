import { useState, useEffect /* , useContext */ } from "react";
// import signedUserContext from "../../context/signedUserContext";

import Link from "next/link";

import { message, Space } from "antd";
import "antd/dist/antd.css";

import Cookies from "js-cookie";

// import Router from "next/router";

import { fetchAuth, fetchSignOut } from "../../libs/authorizeService";
import { getPost } from "../../libs/postService";
import { getPostComments } from "../../libs/commentService";

import { PageTemplate } from "../../components/PageTemplate";
import { SignBanner } from "../../components/SignBanner";
import { UserBanner } from "../../components/UserBanner";
import { MainMenu } from "../../components/MainMenu";
import { CommentsList } from "../../components/CommentsList";
import { Post } from "../../components/Post";
import { EditPostForm } from "../../components/EditPostForm";

// ********
import { useSelector, useDispatch } from "react-redux";

import {
    // setPostCommentsRedux,
    setActivePostRedux,
    updateActivePostRedux,
    deleteActivePostRedux,
    // sendCommentRedux,
    // updateCommentRedux,
    // deleteCommentRedux,
    // authMeRedux,
    // logoutRedux,
    // incrementCommentsCount,
    // decrementCommentsCount,
} from "../../redux/actions/activePostActions.js";

import {
    setPostCommentsRedux,
    // setActivePostRedux,
    // updateActivePostRedux,
    // deleteActivePostRedux,
    sendCommentRedux,
    updateCommentRedux,
    deleteCommentRedux,
    // authMeRedux,
    // logoutRedux,
    // incrementCommentsCount,
    // decrementCommentsCount,
} from "../../redux/actions/commentsListActions.js";

import {
    // setPostCommentsRedux,
    // setActivePostRedux,
    // updateActivePostRedux,
    // deleteActivePostRedux,
    // sendCommentRedux,
    // updateCommentRedux,
    // deleteCommentRedux,
    authMeRedux,
    logoutRedux,
    // incrementCommentsCount,
    // decrementCommentsCount,
} from "../../redux/actions/authorizationActions.js";

import { initializeStore } from "../../redux/store"; // ---  для серверного запросу
// ********

export default () =>
    /* { post, commentsList, error } */
    /* props */ {
        // const [signedUser, setSignedUser] = useContext(signedUserContext);
        // const [comments, setComments] = useState(commentsList);
        const [isLoaded, setIsLoaded] = useState(false);

        // console.log(props, "props in [id]");

        // *******
        const dispatch = useDispatch();
        const commentsListStore = useSelector(
            (state) => state.commentsReducer.commentsList
        );
        const postStore = useSelector((state) => state.postReducer.activePost);
        const signedUserStore = useSelector(
            (state) => state.authReducer.signedUser
        );
        // const activeUserStore = useSelector((state) => state.userReducer.user);

        const errorStore = useSelector((state) => state.errorReducer.error);
        const statusTextStore = useSelector(
            (state) => state.errorReducer.statusText
        );
        // const stateInStore = useSelector((state) => state);
        // console.log(stateInStore, "state in [id]");
        // console.log(signedUserStore, "signedUserStore in index");
        // ***********

        useEffect(async () => {
            setIsLoaded(false);
            await dispatch(authMeRedux());
            setIsLoaded(true);
        }, []);

        // useEffect(() => {
        //     errorStore && message.error(`${statusTextStore}`);
        //     return <div>{statusTextStore}</div>;
        // }, [errorStore]);

        if (errorStore) {
            return <div>{statusTextStore}</div>;
        }

        async function handleDeletePost(post) {
            await dispatch(deleteActivePostRedux(post));
            // Router.push("/");
        }

        async function handleUpdatePost(updatedData) {
            await dispatch(updateActivePostRedux(updatedData));
        }

        async function handleAddComment(commentContent) {
            await dispatch(sendCommentRedux(postStore.id, commentContent));
            // dispatch(incrementCommentsCount());
        }

        async function handleUpdateComment(updatedData) {
            await dispatch(updateCommentRedux(updatedData));
        }

        async function handleDeleteComment(comment) {
            await dispatch(deleteCommentRedux(comment));
            // dispatch(decrementCommentsCount());
        }

        async function handlerLogout() {
            await dispatch(logoutRedux());
        }

        const signBanner = !Object.keys(/* signedUser */ signedUserStore)
            .length &&
            isLoaded && <SignBanner />;

        const userBannerDropdown = !!Object.keys(
            /* signedUser */ signedUserStore
        ).length && (
            <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
                <UserBanner
                    // user={/* signedUser */ signedUserStore}
                    onLogout={handlerLogout}
                />
            </div>
        );

        const commentsComponentList = /* comments */ commentsListStore && (
            <CommentsList
                // commentsList={/* comments */ commentsListStore}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
                // signedUser={/* signedUser */ signedUserStore}
            />
        );

        const addCommentComponent = !!Object.keys(
            signedUserStore /* signedUser */
        ).length && (
            <div className="border border-t-0 border-[#949494] p-2 ">
                <EditPostForm onSave={handleAddComment} contentKind="comment" />
            </div>
        );

        const beTheFirstSigninSignUpComponent = !Object.keys(signedUserStore)
            .length && (
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
                    <MainMenu
                        isAuth={
                            !!Object.keys(/* signedUser */ signedUserStore)
                                .length
                        }
                    />
                </div>
                {userBannerDropdown}
                <header className="border border-[#949494] h-12 font-bold text-lg flex flex-col justify-center pl-4">
                    Thread
                    <div className="text-xs text-[#949494]">{`${postStore.comments_count} replies`}</div>
                </header>
                {/* <div className="border border-t-0 border-[#949494] "> */}

                <Post
                    post={postStore}
                    key={postStore.id}
                    onDeletePost={handleDeletePost}
                    onUpdatePost={handleUpdatePost}
                    // signedUserName={/* signedUser */ signedUserStore.name}
                />

                {/* </div> */}
                {addCommentComponent}
                <div className="h-10 border border-[#949494] border-t-0"></div>
                {beTheFirstComponent}
                {commentsComponentList}
            </PageTemplate>
        );
    };

//#region
// export async function getServerSideProps({ params }) {
//     try {
//         // console.log(params, "params");
//         // const result = await getPost(params.id);
//         // const result2 = await getPostComments(params.id);
//         // console.log(result2, "result2");

//         const result = await Promise.all([
//             getPost(params.id),
//             getPostComments(params.id),
//         ]);

//         return {
//             props: {
//                 post: result[0].data.data,
//                 commentsList: result[1].data.data,
//             },
//         };
//     } catch (error) {
//         // console.log(error, "ERROR COMMENTID");
//         return {
//             props: {
//                 error: error.response.statusText,
//             },
//         };
//     }
// }
//#endregion

// **************
export const withRedux = (getServerSideProps) => async (ctx) => {
    // console.log("start in serverSideProps withRedux");
    const store = initializeStore();
    try {
        const result = await getServerSideProps(ctx, store);
        // console.log(store.getState(), "STORE [id]");
        // console.log(result, "result in serverSideProps withRedux");
        // const state = store.getState();
        // console.log(state, "state in withRedux");
        // console.log("after maby error");

        return {
            ...result,
            props: {
                initialReduxState: store.getState(),
                ...result.props,
            },
        };
    } catch (error) {
        return {
            // ...result,
            props: {
                // initialReduxState: store.getState(),
                error: true,
                // ...result.props,
            },
        };
    }
};

export const getServerSideProps = withRedux(async (context, store) => {
    // console.log(context.params, "context.params in getServerSideProps [id]");
    try {
        const result = await Promise.all([
            store.dispatch(setActivePostRedux(context.params.id)),
            store.dispatch(setPostCommentsRedux(context.params.id)),
        ]);

        const res = JSON.parse(JSON.stringify(result));

        // console.log("after dispatch");

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        // console.log(error, "error in getServerSideProps");
        store.dispatch(setErrorRedux(error));

        return {
            props: {
                error: error.message, //.response.statusText,
            },
        };
    }
});
// ******************

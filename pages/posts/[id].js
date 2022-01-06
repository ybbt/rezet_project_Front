import { useState, useEffect, useContext } from "react";
import signedUserContext from "../../context/signedUserContext";

import { message } from "antd";
import "antd/dist/antd.css";

import Cookies from "js-cookie";

import Router from "next/router";

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
    setPostCommentsRedux,
    setPostOneRedux,
    updatePostOneRedux,
    deletePostOneRedux,
    sendCommentRedux,
    updateCommentRedux,
    deleteCommentRedux,
    authMeRedux,
    logoutRedux,
} from "../../redux/actions";
import { initializeStore } from "../../redux/store"; // ---  для серверного запросу
// ********

export default () =>
    /* { post, commentsList, error } */
    /* props */ {
        const [signedUser, setSignedUser] = useContext(signedUserContext);
        // const [comments, setComments] = useState(commentsList);
        const [isLoaded, setIsLoaded] = useState(false);

        // console.log(props, "props in [id]");

        // *******
        const dispatch = useDispatch();
        const commentsListStore = useSelector(
            (state) => state.commentsReducer.commentsList
        );
        const postStore = useSelector((state) => state.postReducer.post);
        const signedUserStore = useSelector(
            (state) => state.authReducer.signedUser
        );
        // const activeUserStore = useSelector((state) => state.userReducer.user);

        const errorStore = useSelector((state) => state.errorReducer.error);
        const stateInStore = useSelector((state) => state);
        console.log(stateInStore, "state in [id]");
        // console.log(signedUserStore, "signedUserStore in index");
        // ***********

        useEffect(async () => {
            setIsLoaded(false);
            await dispatch(authMeRedux());
            setIsLoaded(true);
        }, []);

        // useEffect(() => {
        //     error && message.error(`${error}`);
        // });

        async function handleAddComment(commentContent) {
            dispatch(sendCommentRedux(postStore.id, commentContent));
        }

        async function handleDeletePost(post) {
            dispatch(deletePostOneRedux(post));
            Router.push("/");
        }

        async function handleUpdatePost(updatedData) {
            dispatch(updatePostOneRedux(updatedData));
        }

        async function handleUpdateComment(updatedData) {}

        async function handleDeleteComment(comment) {
            dispatch(deleteCommentRedux(comment));
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
                    user={/* signedUser */ signedUserStore}
                    onLogout={handlerLogout}
                />
            </div>
        );

        const commentsComponentList = /* comments */ commentsListStore && (
            <CommentsList
                commentsList={/* comments */ commentsListStore}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
                signedUser={/* signedUser */ signedUserStore}
            />
        );

        const addCommentComponent = !!Object.keys(
            signedUserStore /* signedUser */
        ).length && (
            <div className="border border-t-0 border-[#949494] p-2">
                <EditPostForm onSave={handleAddComment} />
            </div>
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
                <header className="border border-[#949494] h-12 font-bold text-lg flex items-center pl-4">
                    Thread
                </header>
                {/* <div className="border border-t-0 border-[#949494] "> */}

                <Post
                    post={postStore}
                    key={postStore.id}
                    onDeletePost={handleDeletePost}
                    onUpdatePost={handleUpdatePost}
                    signedUserName={/* signedUser */ signedUserStore.name}
                />

                {/* </div> */}
                {addCommentComponent}
                <div className="h-10"></div>
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
    const result = await getServerSideProps(ctx, store);
    // console.log(store.getState(), "STORE [id]");

    // console.log(result, "result in serverSideProps withRedux");

    return {
        ...result,

        props: {
            initialReduxState: store.getState(),
            ...result.props,
        },
    };
};

export const getServerSideProps = withRedux(async (context, store) => {
    // console.log(context.params, "context.params in getServerSideProps [id]");
    try {
        /* const result =  */ await Promise.all([
            store.dispatch(setPostOneRedux(context.params.id)),
            store.dispatch(setPostCommentsRedux(context.params.id)),
        ]);

        // console.log("result[0]", "result in getServerSideProps");

        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        console.log(error, "error in getServerSideProps");
        return {
            props: {
                error: error.message, //.response.statusText,
            },
        };
    }
});
// ******************

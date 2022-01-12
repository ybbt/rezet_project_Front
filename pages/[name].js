import { useRouter } from "next/router";
import { useState, useEffect /* , useContext */ } from "react";

// import {
//     getUserPosts,
//     deletePost,
//     sendPost,
//     updatePost,
// } from "../libs/postService";
// import { fetchAuth, fetchSignOut } from "../libs/authorizeService";
// import { getUser } from "../libs/userService";

// import Cookies from "js-cookie";

import { message } from "antd";
import "antd/dist/antd.css";

// import signedUserContext from "../context/signedUserContext";

import { PageTemplate } from "../components/PageTemplate";
import { SignBanner } from "../components/SignBanner";
import { MainMenu } from "../components/MainMenu";
import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { UserWrapper } from "../components/UserWrapper";
import { UserBanner } from "../components/UserBanner";

// ********
import { useSelector, useDispatch } from "react-redux";

import {
    // setUserPostsRedux,
    // sendPostRedux,
    // deletePostRedux,
    // updatePostRedux,
    setUserRedux,
    // authMeRedux,
    // logoutRedux,
    // incrementPostsCount,
    // decrementPostsCount,
} from "../redux/actions/activeUserActions.js";

import {
    setUserPostsRedux,
    sendPostRedux,
    deletePostRedux,
    updatePostRedux,
    // setUserRedux,
    // authMeRedux,
    // logoutRedux,
    // incrementPostsCount,
    // decrementPostsCount,
} from "../redux/actions/postsListActions.js";

import {
    // setUserPostsRedux,
    // sendPostRedux,
    // deletePostRedux,
    // updatePostRedux,
    // setUserRedux,
    authMeRedux,
    logoutRedux,
    // incrementPostsCount,
    // decrementPostsCount,
} from "../redux/actions/authorizationActions.js";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу
// ********

export default ({ error, user, postsList }) => {
    // const [posts, setPosts] = useState(postsList);
    // const [signedUser, setSignedUser] = useContext(signedUserContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const router = useRouter();

    // *******
    const dispatch = useDispatch();
    const postsListStore = useSelector((state) => state.postsReducer.postsList);
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );
    const activeUserStore = useSelector((state) => state.userReducer.user);

    const errorStore = useSelector((state) => state.errorReducer.error);
    // const stateInStore = useSelector((state) => state);
    // console.log(stateInStore, "state in [name]");
    // console.log(signedUserStore, "signedUserStore in index");
    // ***********

    useEffect(async () => {
        console.log("useEffect in [name]");
        // try {
        //     const result = await fetchAuth();

        //     const response = result.data;

        //     setSignedUser(result.data.data);
        // } catch (error) {
        //     console.log(error);
        //     message.error(`${error}`);

        //     Cookies.remove("token_mytweeter");
        //     setSignedUser({});
        // }

        // if (!signedUserStore.name) {

        setIsLoaded(false);
        await dispatch(authMeRedux());
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        error && message.error(`${error}`);
    });

    // useEffect(() => {
    //     setPosts(postsList);
    // }, [postsList]);

    async function handleAddPost(postContent) {
        // try {
        //     const response = await sendPost(postContent);

        //     setPosts([response.data.data, ...posts]);
        // } catch (error) {
        //     message.error(`${error}`);
        //     console.log(error, "error addpost");
        // }
        await dispatch(sendPostRedux(postContent));
        // dispatch(incrementPostsCount());
    }

    async function handleDeletePost(post) {
        // try {
        //     const response = await deletePost(post.id); //axiosInstance.delete(`/posts/${post.id}`);

        //     const newPosts = posts.filter(
        //         (postItem) => postItem.id !== post.id
        //     );
        //     setPosts(newPosts);
        // } catch (error) {
        //     message.error(`${error}`);
        //     console.log(error);
        // }
        await dispatch(deletePostRedux(post));
        // dispatch(decrementPostsCount());
    }

    async function handleUpdatePost(updatedData) {
        // try {
        //     const response = await updatePost(
        //         updatedData.id,
        //         updatedData.content
        //     );

        //     const newPostList = posts.map((postItem) =>
        //         postItem.id === updatedData.id
        //             ? { ...postItem, ...updatedData }
        //             : postItem
        //     );
        //     setPosts(newPostList);
        // } catch (error) {
        //     console.log(error, "error");
        //     message.error(`${error}`);
        // }
        await dispatch(updatePostRedux(updatedData));
    }

    async function handlerLogout() {
        // try {
        //     await fetchSignOut();

        //     Cookies.remove("token_mytweeter");

        //     setSignedUser({});
        // } catch (error) {
        //     console.log(error, "error");
        //     message.error(`${error}`);
        // }
        await dispatch(logoutRedux());
    }

    // const signBanner = !Object.keys(/* signedUser */ signedUserStore)
    //     .length && <SignBanner />;

    const signBanner = !Object.keys(/* signedUser */ signedUserStore).length &&
        isLoaded && <SignBanner />;

    const userBannerDropdown = !!Object.keys(/* signedUser */ signedUserStore)
        .length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner
                // user={/* signedUser */ signedUserStore}
                onLogout={handlerLogout}
            />
        </div>
    );

    const addPostComponent = /* user */ activeUserStore.name ===
        /* signedUser */ signedUserStore.name && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} contentKind="post" />
        </div>
    );

    const postsComponentList = /* posts */ postsListStore && (
        <PostsList
            // postsList={/* posts */ postsListStore}
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
            // signedUser={/* signedUser */ signedUserStore}
        />
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu
                    isAuth={
                        !!Object.keys(/* signedUser */ signedUserStore).length
                    }
                />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12  flex flex-col justify-center pl-4">
                <div className="font-bold text-lg">{`${
                    /* user */ activeUserStore.first_name
                } ${/* user */ activeUserStore.last_name || ""}`}</div>
                <div className="text-xs text-[#949494]">{`${
                    /* postsList */ activeUserStore.posts_count
                } posts`}</div>
            </header>
            <div className="h-64 w-full border border-[#949494] border-t-0">
                <UserWrapper user={/* user */ activeUserStore} />
            </div>
            {addPostComponent}
            {postsComponentList}
        </PageTemplate>
    );
};

// export async function getServerSideProps({ params }) {
//     try {
//         const result = await Promise.all([
//             getUser(params.name),
//             getUserPosts(params.name),
//         ]);

//         return {
//             props: {
//                 user: result[0].data.data,
//                 postsList: result[1].data.data,
//             },
//         };
//     } catch (error) {
//         return {
//             props: {
//                 error: error.response.statusText,
//             },
//         };
//     }
// }

// **************
export const withRedux = (getServerSideProps) => async (ctx) => {
    // console.log("start in serverSideProps withRedux");
    const store = initializeStore();
    const result = await getServerSideProps(ctx, store);
    // console.log(store.getState(), "STORE [name]");

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
    // console.log(context.params, "context.params in getServerSideProps");
    try {
        /* const result =  */ await Promise.all([
            store.dispatch(setUserRedux(context.params.name)),
            store.dispatch(setUserPostsRedux(context.params.name)),
        ]);

        // await store.dispatch(setUserRedux(context.params.name));
        // await store.dispatch(setUserPostsRedux(context.params.name));

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

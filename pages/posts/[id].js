import { useState, useEffect, useContext } from "react";
import signedUserContext from "../../context/signedUserContext";

import { message } from "antd";
import "antd/dist/antd.css";

import Cookies from "js-cookie";

import { fetchAuth, fetchSignOut } from "../../libs/authorizeService";
import { getPost } from "../../libs/postService";
import { getPostComments } from "../../libs/commentService";

import { PageTemplate } from "../../components/PageTemplate";
import { SignBanner } from "../../components/SignBanner";
import { UserBanner } from "../../components/UserBanner";
import { MainMenu } from "../../components/MainMenu";
import { PostsList } from "../../components/PostsList";
import { Post } from "../../components/Post";

// ********
import { useSelector, useDispatch } from "react-redux";
import {
    setPostCommentsRedux,
    /* authMeRedux, logoutRedux ,*/
} from "../../redux/actions";
import { initializeStore } from "../../redux/store"; // ---  для серверного запросу
// ********

export default ({ post, commentsList, error }) => {
    const [signedUser, setSignedUser] = useContext(signedUserContext);
    const [comments, setComments] = useState(commentsList);

    // *******
    const dispatch = useDispatch();
    const commentsListStore = useSelector(
        (state) => state.postsReducer.commentsList
    );
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );
    const activeUserStore = useSelector((state) => state.userReducer.user);

    const errorStore = useSelector((state) => state.errorReducer.error);
    // const stateInStore = useSelector((state) => state);
    // console.log(stateInStore, "state in index");
    // console.log(signedUserStore, "signedUserStore in index");
    // ***********

    useEffect(async () => {
        try {
            const result = await fetchAuth();

            const response = result.data;

            setSignedUser(result.data.data);
        } catch (error) {
            console.log(error);
            message.error(`${error}`);

            Cookies.remove("token_mytweeter");
            setSignedUser({});
        }
    }, []);

    useEffect(() => {
        error && message.error(`${error}`);
    });

    async function handleAddPost(postContent) {
        // try {
        //     const response = await sendPost(postContent);
        //     setPosts([response.data.data, ...posts]);
        // } catch (error) {
        //     message.error(`${error}`);
        //     console.log(error, "error addpost");
        // }
    }

    async function handleDeletePost(post) {
        // try {
        //     const response = await deletePost(post.id);
        //     const newPosts = posts.filter(
        //         (postItem) => postItem.id !== post.id
        //     );
        //     setPosts(newPosts);
        // } catch (error) {
        //     message.error(`${error.response}`);
        //     console.log(error);
        // }
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
    }

    async function handleUpdateComment() {}

    async function handleDeleteComment() {}

    async function handlerLogout() {
        // try {
        //     await fetchSignOut();
        //     Cookies.remove("token_mytweeter");
        //     // setSignedUser({});
        //     setSignedUser({});
        // } catch (error) {
        //     console.log(error, "error");
        //     message.error(`${error}`);
        // }
    }

    const signBanner = !Object.keys(signedUser).length && <SignBanner />;

    const userBannerDropdown = !!Object.keys(signedUser).length && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner user={signedUser} onLogout={handlerLogout} />
        </div>
    );

    const commentsComponentList = comments && (
        <PostsList
            postsList={comments}
            onDeletePost={handleDeleteComment}
            onUpdatePost={handleUpdateComment}
            signedUser={signedUser}
        />
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu isAuth={!!Object.keys(signedUser).length} />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-center pl-4">
                Thread
            </header>
            {/* <div className="border border-t-0 border-[#949494] "> */}
            <Post
                post={post}
                key={post.id}
                onDeletePost={handleDeletePost}
                onUpdatePost={handleUpdatePost}
                signedUserName={signedUser.name}
            />
            {/* </div> */}
            <div className="h-10"></div>
            {commentsComponentList}
        </PageTemplate>
    );
};

export async function getServerSideProps({ params }) {
    try {
        // console.log(params, "params");
        // const result = await getPost(params.id);
        // const result2 = await getPostComments(params.id);
        // console.log(result2, "result2");

        const result = await Promise.all([
            getPost(params.id),
            getPostComments(params.id),
        ]);

        return {
            props: {
                post: result[0].data.data,
                commentsList: result[1].data.data,
            },
        };
    } catch (error) {
        // console.log(error, "ERROR COMMENTID");
        return {
            props: {
                error: error.response.statusText,
            },
        };
    }
}

import { useEffect } from "react";

// import { message } from "antd";
import "antd/dist/antd.css";

import { PostsList } from "../components/PostsList";
import { EditPostForm } from "../components/EditPostForm";
import { MainMenu } from "../components/MainMenu";
import { PageTemplate } from "../components/PageTemplate";
import { SignBanner } from "../components/SignBanner";
import { UserBanner } from "../components/UserBanner";

import { useSelector, useDispatch } from "react-redux";
import {
    setPostsRedux,
    sendPostRedux,
    deletePostRedux,
    updatePostRedux,
} from "../redux/actions/postsListActions.js";
import { authMeRedux } from "../redux/actions/authorizationActions.js";

import useAuthStatus from "../hooks/useAuthStatus";

import { initializeStore } from "../redux/store"; // ---  для серверного запросу

export default function Index() {
    const dispatch = useDispatch();
    const postsListStore = useSelector((state) => state.postsReducer.postsList);

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

    useEffect(() => {
        errorStore && message.error(`${errorStore}`);
        console.log(errorStore, "errorStore in useEffect");
    }, [errorStore]);

    if (errorStore) {
        return <div>{statusTextStore}</div>;
    }

    async function handleAddPost(postContent) {
        await dispatch(sendPostRedux(postContent));
    }

    async function handleDeletePost(post) {
        await dispatch(deletePostRedux(post));
    }

    async function handleUpdatePost(updatedData) {
        await dispatch(updatePostRedux(updatedData));
    }

    const addPostComponent = isAuthStore && (
        <div className="border border-t-0 border-[#949494] p-2">
            <EditPostForm onSave={handleAddPost} contentKind="post" />
        </div>
    );

    const signBanner = !isAuthStore && isLoadStore && <SignBanner />;

    const userBannerDropdown = isAuthStore && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <UserBanner />
        </div>
    );

    const postsComponentList = postsListStore && (
        <PostsList
            onDeletePost={handleDeletePost}
            onUpdatePost={handleUpdatePost}
        />
    );

    return (
        <PageTemplate signBanner={signBanner}>
            <div className="w-32 h-40 fixed top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11 border border-gray text-xl font-medium flex flex-col">
                <MainMenu />
            </div>
            {userBannerDropdown}
            <header className="border border-[#949494] h-12 font-bold text-lg flex items-center pl-4">
                Explore
            </header>
            {addPostComponent}
            {postsComponentList}
        </PageTemplate>
    );
}

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
        await store.dispatch(setPostsRedux());
        return {
            props: {
                message: "hello world",
            },
        };
    } catch (error) {
        console.log(error, "Error in getStaticProps");
        store.dispatch(setErrorRedux(error));
    }
});

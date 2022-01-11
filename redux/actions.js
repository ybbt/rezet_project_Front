import * as types from "./actionsTypes";

import {
    getHomePosts,
    getUserPosts,
    deletePost,
    sendPost,
    updatePost,
    getPost,
} from "../libs/postService";

import {
    getPostComments,
    setPostComment,
    updateComment,
    deleteComment,
} from "../libs/commentService";
import { getUser } from "../libs/userService";
import { fetchAuth, fetchSignOut } from "../libs/authorizeService";

import Cookies from "js-cookie";

export const setUserRedux = (userName) => async (dispatch) => {
    console.log("setUserRedux in action before fetch");
    try {
        const response = await getUser(userName);
        dispatch({
            type: types.SET_USER,
            payload: { user: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const setPostOneRedux = (postId) => async (dispatch) => {
    console.log(postId, "postId in  setPostOneRedux");
    try {
        const response = await getPost(postId);
        // console.log(response.data, "result in setPostOneRedux");
        dispatch({
            type: types.SET_POST_SINGLE,
            payload: { post: response.data.data },
        });
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const updatePostOneRedux = (updatedData) => async (dispatch) => {
    console.log(updatedData, "postId in  updatePostOneRedux");
    try {
        const response = await updatePost(updatedData.id, updatedData.content);
        // console.log(response.data, "result in updatePostOneRedux");
        dispatch({
            type: types.UPDATE_POST_SINGLE,
            payload: { updatedPost: updatedData },
        });
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const deletePostOneRedux = (post) => async (dispatch) => {
    console.log(post, "postId in  deletePostOneRedux");
    try {
        const response = await deletePost(post.id);
        // console.log(response.data, "result in updatePostOneRedux");
        // dispatch({
        //     type: types.DELETE_POST_SINGLE,
        //     payload: { deletedPost: post },
        // });
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const setUserPostsRedux = (userName) => async (dispatch) => {
    // console.log(
    //     userName,
    //     "userName in setUserPostsRedux in action before fetch"
    // );
    try {
        const response = await getUserPosts(userName);
        dispatch({
            type: types.SET_USER_POSTS,
            payload: { userPosts: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in setUserPostsRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const setPostsRedux = () => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    try {
        const response = await getHomePosts();
        dispatch({
            type: types.SET_POSTS,
            payload: { posts: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const sendPostRedux = (content) => async (dispatch) => {
    console.log("sendPostsRedux in action before fetch");
    try {
        const response = await sendPost(content);
        dispatch({
            type: types.SEND_POST,
            payload: { post: response.data.data },
            // payload: { content, author },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const deletePostRedux = (post) => async (dispatch) => {
    console.log("deletePostsRedux in action before fetch");
    try {
        const response = await deletePost(post.id);
        dispatch({
            type: types.DELETE_POST,
            payload: { post: post },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const updatePostRedux = (updatedData) => async (dispatch) => {
    console.log("updatePostsRedux in action before fetch");
    try {
        const response = await updatePost(updatedData.id, updatedData.content);
        dispatch({
            type: types.UPDATE_POST,
            payload: { updatedPost: updatedData },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const setPostCommentsRedux = (postId) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await getPostComments(postId);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.SET_POST_COMMENTS,
            payload: { postComments: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in setPostCommentsRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const sendCommentRedux = (postId, content) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await setPostComment(postId, content);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.SEND_COMMENT,
            payload: { comment: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const updateCommentRedux = (updatedData) => async (dispatch) => {
    console.log(/* updatedData, */ "updateCommentRedux in action before fetch");
    try {
        const response = await updateComment(
            updatedData.id,
            updatedData.content
        );
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.UPDATE_COMMENT,
            payload: { updatedComment: updatedData },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const deleteCommentRedux = (comment) => async (dispatch) => {
    console.log(comment, "updateCommentRedux in action before fetch");
    try {
        const response = await deleteComment(comment.id);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.DELETE_COMMENT,
            payload: { deletedComment: comment },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const authMeRedux = () => async (dispatch) => {
    console.log("authMe in action before fetch");
    try {
        const response = await fetchAuth();
        dispatch({
            type: types.AUTH_ME,
            payload: { signedUser: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        console.log("authMe in action Error");
        dispatch({
            type: types.AUTH_ME,
            payload: {
                signedUser: {
                    /* fakap: "XXX" */
                },
            },
        });
        Cookies.remove("token_mytweeter");
    }
};

export const logoutRedux = () => async (dispatch) => {
    console.log("logout in action before fetch");
    try {
        const response = await fetchSignOut();
        dispatch({
            type: types.LOGOUT,
            payload: { signedUser: {} },
        });
        Cookies.remove("token_mytweeter");
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error, "error in logoutRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.message && error.response },
        });
    }
};

export const incrementPostsCount = () => ({
    type: types.INCREMENT_POSTS_COUNT,
});

export const decrementPostsCount = () => ({
    type: types.DECREMENT_POSTS_COUNT,
});

export const incrementCommentsCount = () => ({
    type: types.INCREMENT_COMMENTS_COUNT,
});

export const decrementCommentsCount = () => ({
    type: types.DECREMENT_COMMENTS_COUNT,
});

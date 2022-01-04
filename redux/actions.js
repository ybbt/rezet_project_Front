import * as types from "./actionsTypes";

import {
    getHomePosts,
    getUserPosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";

import { getPostComments } from "../libs/commentService";

import { getUser } from "../libs/userService";

import { fetchAuth, fetchSignOut } from "../libs/authorizeService";

import Cookies from "js-cookie";

/* // INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })
 */

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
            payload: { error: error.response },
        });
    }
};

export const setUserPostsRedux = (userName) => async (dispatch) => {
    console.log("setUserPostsRedux in action before fetch");
    try {
        const response = await getUserPosts(userName);
        dispatch({
            type: types.SET_USER_POSTS,
            payload: { userPosts: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.response },
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
            payload: { error: error.response },
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
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.response },
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
            payload: { error: error.response },
        });
    }
};

export const updatePostRedux = (updatedData) => async (dispatch) => {
    console.log("updatePostsRedux in action before fetch");
    try {
        const response = await updatePost(updatedData.id, updatedData.content);
        dispatch({
            type: types.UPDATE_POST,
            payload: { updatedPost: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.response },
        });
    }
};

export const setPostCommentsRedux = (postId) => async (dispatch) => {
    console.log("setPostCommentsRedux in action before fetch");
    try {
        const response = await getPostComments(postId);
        dispatch({
            type: types.SET_POST_COMMENTS,
            payload: { postComments: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: { error: error.response },
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
            payload: { error: error.response },
        });
    }
};

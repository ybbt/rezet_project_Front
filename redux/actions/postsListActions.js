import {
    getHomePosts,
    getUserPosts,
    deletePost,
    sendPost,
    updatePost,
    getPost,
} from "../../libs/postService";

import * as types from "../actionsTypes";

export const setUserPostsRedux = (userName) => async (dispatch) => {
    try {
        const response = await getUserPosts(userName);
        dispatch({
            type: types.SET_POSTSLIST /* SET_USER_POSTSLIST */,
            payload: { /* userPosts */ posts: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in setUserPostsRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const setPostsRedux = () => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    try {
        const response = await getHomePosts();
        dispatch({
            type: types.SET_POSTSLIST,
            payload: { posts: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const sendPostRedux = (content) => async (dispatch) => {
    console.log("sendPostsRedux in action before fetch");
    try {
        const response = await sendPost(content);
        dispatch({
            type: types.NEW_POST_IN_LIST,
            payload: { post: response.data.data },
            // payload: { content, author },
        });
        dispatch({
            type: types.INCREMENT_POSTS_COUNT,
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const deletePostRedux = (post) => async (dispatch) => {
    console.log("deletePostsRedux in action before fetch");
    try {
        const response = await deletePost(post.id);
        dispatch({
            type: types.DELETE_POST_IN_LIST,
            payload: { post: post },
        });
        dispatch({
            type: types.DECREMENT_POSTS_COUNT,
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const updatePostRedux = (updatedData) => async (dispatch) => {
    console.log("updatePostsRedux in action before fetch");
    try {
        const response = await updatePost(updatedData.id, updatedData.content);
        dispatch({
            type: types.UPDATE_POST_IN_LIST,
            payload: { updatedPost: updatedData },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        // console.log(error);
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

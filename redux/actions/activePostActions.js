import {
    // getHomePosts,
    // getUserPosts,
    deletePost,
    // sendPost,
    updatePost,
    getPost,
} from "../../libs/postService";

import * as types from "../actionsTypes";

import Router from "next/router";

export const setActivePostRedux = (postId) => async (dispatch) => {
    console.log(postId, "postId in  setActivePostRedux");
    try {
        const response = await getPost(postId);
        // console.log(response.data, "result in setActivePostRedux");
        dispatch({
            type: types.SET_ACTIVE_POST,
            payload: { post: response.data.data },
        });
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const updateActivePostRedux = (updatedData) => async (dispatch) => {
    console.log(updatedData, "postId in  updateActivePostRedux");
    try {
        const response = await updatePost(updatedData.id, updatedData.content);
        // console.log(response.data, "result in updateActivePostRedux");
        dispatch({
            type: types.UPDATE_ACTIVE_POST,
            payload: { updatedPost: updatedData },
        });
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const deleteActivePostRedux = (post) => async (dispatch) => {
    console.log(post, "postId in  deleteActivePostRedux");
    try {
        const response = await deletePost(post.id);
        // console.log(response.data, "result in updateActivePostRedux");
        // dispatch({
        //     type: types.DELETE_POST_SINGLE,
        //     payload: { deletedPost: post },
        // });
        Router.push("/");
    } catch (error) {
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

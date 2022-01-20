import {
    // getHomePosts,
    // getUserPosts,
    deletePostService,
    // sendPost,
    updatePostService,
    getPostService,
} from "../../libs/postService";

import * as types from "../actionsTypes";

import Router from "next/router";

export const getActivePostAsinc = (postId) => async (dispatch) => {
    console.log(postId, "postId in  setActivePostRedux");
    try {
        const response = await getPostService(postId);
        // console.log(response.data, "result in setActivePostRedux");
        dispatch(
            setActivePost(response.data.data)
            /*             {
            type: types.SET_ACTIVEPOST,
            payload: { post: response.data.data },
        } */
        );
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

const setActivePost = (post) => ({
    type: types.SET_ACTIVEPOST,
    payload: { post },
});

export const updateActivePostAsync = (updatedData) => async (dispatch) => {
    console.log(updatedData, "postId in  updateActivePostRedux");
    try {
        /*const response = await */ updatePostService(
            updatedData.id,
            updatedData.content
        );
        // console.log(response.data, "result in updateActivePostRedux");
        dispatch(
            updateActivePost(updatedData)
            /*  {
            type: types.UPDATE_ACTIVEPOST,
            payload: { updatedPost: updatedData },
        } */
        );
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

const updateActivePost = (updatedPost) => ({
    type: types.UPDATE_ACTIVEPOST,
    payload: { updatedPost },
});

export const deleteActivePostAsync = (post) => async (dispatch) => {
    console.log(post, "postId in  deleteActivePostRedux");
    try {
        const response = await deletePostService(post.id);
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

// const deleteActivePost = (delitedPost) => ({
//     type: types.DELETE_ACTIVEPOST,
//     payload: { delitedPost },
// });

import {
    deletePostService,
    updatePostService,
    getPostService,
} from "../../libs/postService";

import * as types from "../actionsTypes";

import { setError } from "../error/errorActions";

export const getActivePostAsinc = (postId) => async (dispatch) => {
    try {
        const response = await getPostService(postId);

        dispatch(setActivePost(response.data.data));
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const setActivePost = (post) => ({
    type: types.SET_ACTIVEPOST,
    payload: { post },
});

export const updateActivePostAsync = (updatedData) => async (dispatch) => {
    dispatch(updateActivePost(updatedData));
    try {
        await updatePostService(updatedData.id, updatedData.content);
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const updateActivePost = (updatedPost) => ({
    type: types.UPDATE_ACTIVEPOST,
    payload: { updatedPost },
});

export const deleteActivePostAsync = (post) => async (dispatch) => {
    try {
        await deletePostService(post.id);

        dispatch(deleteActivePost());
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const deleteActivePost = () => ({
    type: types.DELETE_ACTIVEPOST,
});

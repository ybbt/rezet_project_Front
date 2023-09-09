import {
    getHomePostsService,
    getUserPostsService,
    deletePostService,
    sendPostService,
    updatePostService,
    getPostService,
} from "../../libs/postService";

import * as types from "../actionsTypes";

import { setError } from "../error/errorActions";

export const getUserPostsListAsync = (userName) => async (dispatch) => {
    try {
        const response = await getUserPostsService(userName);
        dispatch(setUserPostsList(response.data.data));
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

export const getAllPostsListAsync = () => async (dispatch) => {
    try {
        const response = await getHomePostsService();
        dispatch({
            type: types.SET_POSTSLIST,
            payload: { posts: response.data.data },
        });
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const setUserPostsList = (posts) => ({
    type: types.SET_POSTSLIST,
    payload: { posts },
});

export const newPostAsync = (content) => async (dispatch) => {
    try {
        const response = await sendPostService(content);
        dispatch(newPost(response.data.data));
        dispatch({
            type: types.INCREMENT_POSTS_COUNT,
        });
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const newPost = (post) => ({
    type: types.NEW_POST_IN_LIST,
    payload: { post },
});

export const deletePostAsync = (post) => async (dispatch) => {
    dispatch(deletePost(post));
    dispatch({ type: types.DECREMENT_POSTS_COUNT });

    try {
        await deletePostService(post.id);
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const deletePost = (post) => ({
    type: types.DELETE_POST_IN_LIST,
    payload: { post },
});

export const updatePostAsync = (updatedData) => async (dispatch) => {
    dispatch(updatePost(updatedData));

    try {
        await updatePostService(updatedData.id, updatedData.content);
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const updatePost = (updatedData) => ({
    type: types.UPDATE_POST_IN_LIST,
    payload: { updatedData },
});

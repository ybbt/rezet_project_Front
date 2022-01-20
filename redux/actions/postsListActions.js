import {
    getHomePostsService,
    getUserPostsService,
    deletePostService,
    sendPostService,
    updatePostService,
    getPostService,
} from "../../libs/postService";

import * as types from "../actionsTypes";

export const getUserPostsListAsync = (userName) => async (dispatch) => {
    try {
        const response = await getUserPostsService(userName);
        dispatch(
            setUserPostsList(response.data.data)
            // {
            //     type: types.SET_POSTSLIST /* SET_USER_POSTSLIST */,
            //     payload: { /* userPosts */ posts: response.data.data },
            // }
        );
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

export const getAllPostsListAsync = () => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    try {
        const response = await getHomePostsService();
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

const setUserPostsList = (posts) => ({
    type: types.SET_POSTSLIST,
    payload: { posts },
});

export const newPostAsync = (content) => async (dispatch) => {
    console.log("sendPostsRedux in action before fetch");
    try {
        const response = await sendPostService(content);
        dispatch(
            newPost(response.data.data)
            /*  {
            type: types.NEW_POST_IN_LIST,
            payload: { post: response.data.data },
            // payload: { content, author },
        } */
        );
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

const newPost = (post) => ({
    type: types.NEW_POST_IN_LIST,
    payload: { post },
});

export const deletePostAsync = (post) => async (dispatch) => {
    console.log("deletePostsRedux in action before fetch");
    try {
        /*const response = await */ deletePostService(post.id);
        dispatch(
            deletePost(post)
            /* {
            type: types.DELETE_POST_IN_LIST,
            payload: { post: post },
        } */
        );
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

const deletePost = (posts) => ({
    type: types.DELETE_POST_IN_LIST,
    payload: { posts },
});

export const updatePostAsync = (updatedData) => async (dispatch) => {
    console.log("updatePostsRedux in action before fetch");
    try {
        /*const response = await */ updatePostService(
            updatedData.id,
            updatedData.content
        );
        dispatch(
            updatePost(updatedData)
            /*     {
            type: types.UPDATE_POST_IN_LIST,
            payload: { updatedPost: updatedData },
        } */
        );
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

const updatePost = (updatedData) => ({
    type: types.UPDATE_POST_IN_LIST,
    payload: { updatedData },
});

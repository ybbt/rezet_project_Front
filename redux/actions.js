import * as types from "./actionsTypes";

import {
    getHomePosts,
    deletePost,
    sendPost,
    updatePost,
} from "../libs/postService";

/* // INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })
 */

export const setPostsRedux = () => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    const response = await getHomePosts(); //fetch("http://127.0.0.1:8000/api/posts");
    // const json = await response.json();
    // console.log(response.data.data, "setPostsRedux in action after fetch");
    dispatch({
        type: types.SET_POSTS,
        payload: { posts: response.data.data },
    });
};

export const sendPostRedux = (content) => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    const response = await sendPost(content);
    // const json = await response.json();
    // console.log(response.data.data, "setPostsRedux in action after fetch");
    dispatch({
        type: types.SEND_POST,
        payload: { post: response.data.data },
    });
};

export const deletePostRedux = (post) => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    const response = await deletePost(post.id);
    // const json = await response.json();
    // console.log(response.data.data, "setPostsRedux in action after fetch");
    dispatch({
        type: types.DELETE_POST,
        payload: { post: post },
    });
};

export const updatePostRedux = (updatedData) => async (dispatch) => {
    console.log("setPostsRedux in action before fetch");
    const response = await updatePost(updatedData.id, updatedData.content);
    // const json = await response.json();
    // console.log(response.data.data, "setPostsRedux in action after fetch");
    dispatch({
        type: types.UPDATE_POST,
        payload: { updatedPost: response.data.data },
    });
};

import {
    getPostComments,
    setPostComment,
    updateComment,
    deleteComment,
} from "../../libs/commentService";

import * as types from "../actionsTypes";

export const setPostCommentsRedux = (postId) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await getPostComments(postId);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.SET_COMMENTSLIST,
            payload: { postComments: response.data.data },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in setPostCommentsRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const sendCommentRedux = (postId, content) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await setPostComment(postId, content);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.NEW_COMMENT_IN_LIST,
            payload: { comment: response.data.data },
        });
        dispatch({
            type: types.INCREMENT_COMMENTS_COUNT,
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
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
            type: types.UPDATE_COMMENT_IN_LIST,
            payload: { updatedComment: updatedData },
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

export const deleteCommentRedux = (comment) => async (dispatch) => {
    console.log(/* comment, */ "deleteCommentRedux in action before fetch");
    try {
        const response = await deleteComment(comment.id);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch({
            type: types.DELETE_COMMENT_IN_LIST,
            payload: { deletedComment: comment },
        });
        dispatch({
            type: types.DECREMENT_COMMENTS_COUNT,
        });
    } catch (error) {
        // message.error(`${error.response}`);
        console.log(error.message, "error in sendCommentRedux");
        dispatch({
            type: types.SET_ERROR,
            payload: {
                error: error.response || null,
                errorMessage: error.message || null,
            },
        });
    }
};

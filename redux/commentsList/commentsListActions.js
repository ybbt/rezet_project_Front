import {
    getPostCommentsService,
    setPostCommentService,
    updateCommentService,
    deleteCommentService,
} from "../../libs/commentService";

import * as types from "../actionsTypes";

import { setError } from "../error/errorActions";

export const getCommentsListAsync = (postId) => async (dispatch) => {
    try {
        const response = await getPostCommentsService(postId);

        dispatch(setPostComments(response.data.data));
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const setPostComments = (postComments) => ({
    type: types.SET_COMMENTSLIST,
    payload: { postComments },
});

export const newCommentAsync = (postId, content) => async (dispatch) => {
    try {
        const response = await setPostCommentService(postId, content);

        dispatch(newComment(response.data.data));
        dispatch({
            type: types.INCREMENT_COMMENTS_COUNT,
        });
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const newComment = (comment) => ({
    type: types.NEW_COMMENT_IN_LIST,
    payload: { comment },
});

export const updateCommentAsync = (updatedData) => async (dispatch) => {
    dispatch(updateComment(updatedData));
    try {
        await updateCommentService(updatedData.id, updatedData.content);
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const updateComment = (updatedComment) => ({
    type: types.UPDATE_COMMENT_IN_LIST,
    payload: { updatedComment },
});

export const deleteCommentAsync = (comment) => async (dispatch) => {
    dispatch(deleteComment(comment));
    dispatch({
        type: types.DECREMENT_COMMENTS_COUNT,
    });
    try {
        await deleteCommentService(comment.id);
    } catch (error) {
        dispatch(setError(error.response || null, error.message || null));
    }
};

const deleteComment = (deletedComment) => ({
    type: types.DELETE_COMMENT_IN_LIST,
    payload: { deletedComment },
});

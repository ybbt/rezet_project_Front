import {
    getPostCommentsService,
    setPostCommentService,
    updateCommentService,
    deleteCommentService,
} from "../../libs/commentService";

import * as types from "../actionsTypes";

export const getCommentsListAsync = (postId) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await getPostCommentsService(postId);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch(
            setPostComments(response.data.data)
            /*  {
            type: types.SET_COMMENTSLIST,
            payload: { postComments: response.data.data },
        } */
        );
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

const setPostComments = (postComments) => ({
    type: types.SET_COMMENTSLIST,
    payload: { postComments },
});

export const newCommentAsync = (postId, content) => async (dispatch) => {
    console.log(postId, "setPostCommentsRedux in action before fetch");
    try {
        const response = await setPostCommentService(postId, content);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch(
            newComment(response.data.data)
            // {
            //     type: types.NEW_COMMENT_IN_LIST,
            //     payload: { comment: response.data.data },
            // }
        );
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

const newComment = (comment) => ({
    type: types.NEW_COMMENT_IN_LIST,
    payload: { comment },
});

export const updateCommentAsync = (updatedData) => async (dispatch) => {
    console.log(/* updatedData, */ "updateCommentRedux in action before fetch");
    try {
        /*const response = await */ updateCommentService(
            updatedData.id,
            updatedData.content
        );
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch(
            updateComment(updatedData)
            /*  {
            type: types.UPDATE_COMMENT_IN_LIST,
            payload: { updatedComment: updatedData },
        } */
        );
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

const updateComment = (updatedComment) => ({
    type: types.UPDATE_COMMENT_IN_LIST,
    payload: { updatedComment },
});

export const deleteCommentAsync = (comment) => async (dispatch) => {
    console.log(/* comment, */ "deleteCommentRedux in action before fetch");
    try {
        /*const response = await */ deleteCommentService(comment.id);
        // console.log(response.data.data, "response in setPostCommentsRedux");
        dispatch(
            deleteComment(comment)
            //     {
            //     type: types.DELETE_COMMENT_IN_LIST,
            //     payload: { deletedComment: comment },
            // }
        );
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

const deleteComment = (deletedComment) => ({
    type: types.DELETE_COMMENT_IN_LIST,
    payload: { deletedComment },
});

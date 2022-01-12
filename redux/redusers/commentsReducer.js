import * as types from "../actionsTypes";

const initialCommentsState = {
    commentsList: [],
};

const commentsReducer = (state = initialCommentsState, { type, payload }) => {
    switch (type) {
        case types.SET_POST_COMMENTS:
            const newState = Object.assign({}, state, {
                commentsList: payload.postComments,
            });
            // console.log(newState, "SET_POST_COMMENTS in switch");
            return newState;
            break;
        case types.SEND_COMMENT:
            console.log(payload, "payload SEND_COMMENT in switch");
            return Object.assign({}, state, {
                commentsList: [
                    payload && payload.comment,
                    ...state.commentsList,
                ],
            });
            break;
        case types.UPDATE_COMMENT:
            const newCommentsListUpdated = state.commentsList.map(
                (commentItem) =>
                    commentItem.id === payload.updatedComment.id
                        ? { ...commentItem, ...payload.updatedComment }
                        : commentItem
            );
            // console.log(newCommentsList, "newCommentsList");
            return Object.assign({}, state, {
                commentsList: newCommentsListUpdated,
            });
        case types.DELETE_COMMENT:
            const newCommentsListDeleted = state.commentsList.filter(
                (commentItem) => commentItem.id !== payload.deletedComment.id
            );
            // console.log(newCommentsList, "newCommentsList");
            return Object.assign({}, state, {
                commentsList: newCommentsListDeleted,
            });
            break;
        default:
            return state;
    }
};

export default commentsReducer;

import * as types from "../actionsTypes";

const initialCommentsState = {
    commentsList: [],
};

const commentsListReducer = (
    state = initialCommentsState,
    { type, payload }
) => {
    switch (type) {
        case types.SET_COMMENTSLIST:
            const newState = {
                ...state,
                ...{
                    commentsList: payload.postComments,
                },
            };

            return newState;
            break;
        case types.NEW_COMMENT_IN_LIST:
            return {
                ...state,
                ...{
                    commentsList: [
                        payload && payload.comment,
                        ...state.commentsList,
                    ],
                },
            };
            break;
        case types.UPDATE_COMMENT_IN_LIST:
            const newCommentsListUpdated = state.commentsList.map(
                (commentItem) =>
                    commentItem.id === payload.updatedComment.id
                        ? { ...commentItem, ...payload.updatedComment }
                        : commentItem
            );

            return {
                ...state,
                ...{
                    commentsList: newCommentsListUpdated,
                },
            };
        case types.DELETE_COMMENT_IN_LIST:
            const newCommentsListDeleted = state.commentsList.filter(
                (commentItem) => commentItem.id !== payload.deletedComment.id
            );

            return {
                ...state,
                ...{
                    commentsList: newCommentsListDeleted,
                },
            };
            break;
        default:
            return state;
    }
};

export default commentsListReducer;

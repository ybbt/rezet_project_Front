import axiosConfigured from "../libs/axiosInstance";
import { COMMENT_ROUTES } from "../libs/routes";

export const getPostComments = (postId) => {
    return axiosConfigured.get(COMMENT_ROUTES.GET_POST_COMMENTS(postId));
};

export const setPostComment = (postId, content) => {
    return axiosConfigured.post(COMMENT_ROUTES.SET_COMMENT(postId), {
        content,
    });
};

export const updateComment = (commentId, content) => {
    return axiosConfigured.put(COMMENT_ROUTES.UPDATE_COMMENT(commentId), {
        content,
    });
};

export const deleteComment = (commentId) => {
    return axiosConfigured.delete(COMMENT_ROUTES.DELETE_COMMENT(commentId));
};

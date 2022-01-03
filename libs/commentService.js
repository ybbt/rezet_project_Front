import axiosConfigured from "../libs/axiosInstance";
import { COMMENT_ROUTES } from "../libs/routes";

export const getPostComments = (postId) => {
    return axiosConfigured.get(COMMENT_ROUTES.GET_POST_COMMENTS(postId));
};

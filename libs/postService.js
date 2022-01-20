import axiosConfigured from "../libs/axiosInstance";
import { POST_ROUTES } from "../libs/routes";

export const getHomePostsService = () => {
    return axiosConfigured.get(POST_ROUTES.HOME_POSTS);
};

export const getPostService = (postId) => {
    return axiosConfigured.get(POST_ROUTES.GET_POST(postId));
};

export const sendPostService = (content) => {
    return axiosConfigured.post(POST_ROUTES.SET_POST, { content });
};

export const updatePostService = (postId, content) => {
    return axiosConfigured.put(POST_ROUTES.UPDATE_POST(postId), { content });
};

export const deletePostService = (postId) => {
    return axiosConfigured.delete(POST_ROUTES.DELETE_POST(postId));
};

export const getUserPostsService = (userName) => {
    return axiosConfigured.get(POST_ROUTES.GET_USER_POSTS(userName));
};

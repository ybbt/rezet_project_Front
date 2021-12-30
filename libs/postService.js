import axiosConfigured from "../libs/axiosInstance";
import { POST_ROUTES } from "../libs/routes";

export const getHomePosts = () => {
    return axiosConfigured.get(POST_ROUTES.HOME_POSTS);
};

export const getPost = (postId) => {
    return axiosConfigured.get(POST_ROUTES.GET_POST(postId));
};

export const sendPost = (content) => {
    return axiosConfigured.post(POST_ROUTES.SET_POST, { content });
};

export const updatePost = (postId, content) => {
    return axiosConfigured.put(POST_ROUTES.UPDATE_POST(postId), { content });
};

export const deletePost = (postId) => {
    return axiosConfigured.delete(POST_ROUTES.DELETE_POST(postId));
};

export const getUserPosts = (userName) => {
    return axiosConfigured.get(POST_ROUTES.GET_USER_POSTS(userName));
};

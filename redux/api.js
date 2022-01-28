import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import axiosInstance from "../libs/axiosInstance";

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data,
                },
            };
        }
    };

export const api = createApi({
    baseQuery: /* fetchBaseQuery */ axiosBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        // prepareHeaders: (headers, { getState }) => {
        //     const token = Cookies.get("token_mytweeter");
        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`);
        //     }
        //     headers.set("accept", `application/json`);
        //     return headers;
        // },
    }),
    tagTypes: ["Post", "Comment", "User"],
    reducerPath: "tweetterAPI",
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getPostById: build.query({
            // query: (id) => `/posts/${id}`,
            query: (id) => ({
                url: `posts/${id}`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
        updatePostById: build.mutation({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: "PUT",

                /* body: */ data,
            }),
            // async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         api.util.updateQueryData("getPostById", id, (draft) => {
            //             console.log(first);
            //             return Object.assign(draft, data);
            //         })
            //     );
            //     try {
            //         await queryFulfilled;
            //     } catch {
            //         patchResult.undo();
            //     }
            // },
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        deletePostById: build.mutation({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post", "User"],
        }),
        addPost: build.mutation({
            query: ({ data }) => ({
                url: `posts`,
                method: "POST",
                /* body: */ data,
            }),
            invalidatesTags: ["Post", "User"],
        }),
        getPostsList: build.query({
            // query: () => `/posts`,
            query: () => ({
                url: `posts`,
                method: "GET",
            }),
            // providesTags: ["Post"],
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "Post",
                              id,
                          })),
                          "Post",
                      ]
                    : ["Post"],
        }),
        getPostsListByUsername: build.query({
            // query: (name) => `/users/${name}/posts`,
            query: (name) => ({
                url: `users/${name}/posts`,
                method: "GET",
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "Post",
                              id,
                          })),
                          "Post",
                      ]
                    : ["Post"],
        }),
        getCommentsListByPostid: build.query({
            // query: (id) => `/posts/${id}/comments`,
            query: (id) => ({
                url: `posts/${id}/comments`,
                method: "GET",
            }),
            // providesTags: ["Comment"],
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "Comment",
                              id,
                          })),
                          "Comment",
                      ]
                    : ["Comment"],
        }),
        addCommentByPostid: build.mutation({
            query: ({ postId, data }) => ({
                url: `posts/${postId}/comments`,
                method: "POST",
                /* body: */ data,
            }),
            invalidatesTags: ["Comment", "Post"],
        }),
        updateCommentById: build.mutation({
            query: ({ id, data }) => ({
                url: `comments/${id}`,
                method: "PUT",
                /* body:  */ data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Comment", id: arg.id },
            ],
        }),
        deleteCommentById: build.mutation({
            query: ({ id }) => ({
                url: `comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comment", "Post"],
        }),
        getUserByUsername: build.query({
            // query: (name) => `/users/${name}`,
            query: (name) => ({
                url: `users/${name}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        // getActiveUserByToken: build.query({
        //     query: () => `/me`,

        // }),
        getAuthentification: build.query({
            // query: () => `/me`,
            query: () => ({
                url: `me`,
                method: "GET",
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetPostByIdQuery,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useAddPostMutation,
    useGetPostsListQuery,
    useGetPostsListByUsernameQuery,
    useGetCommentsListByPostidQuery,
    useAddCommentByPostidMutation,
    useUpdateCommentByIdMutation,
    useDeleteCommentByIdMutation,
    useGetUserByUsernameQuery,
    useGetActiveUserByToken,
    useGetAuthentificationQuery,
    util: { getRunningOperationPromises },
} = api;

// export endpoints for use in SSR
export const {
    getPostById,
    getPostsList,
    getPostsListByUsername,
    getCommentsListByPostid,
    getUserByUsername,
    getAuthentification,
} = api.endpoints;

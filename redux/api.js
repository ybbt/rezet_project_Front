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
            providesTags: (result, error, id) => [{ type: "Post", id }],
        }),
        updatePostById: build.mutation({
            query: ({ id, data, name }) => ({
                url: `posts/${id}`,
                method: "PUT",

                /* body: */ data,
            }),
            async onQueryStarted(
                { id, data, name },
                { dispatch, queryFulfilled, getState }
            ) {
                // console.log(
                //     Object.values(getState().tweetterAPI.queries)[1].data.data,
                //     "getState in onQueryStarted in addPost"
                // );
                const patchResultAllPosts = dispatch(
                    api.util.updateQueryData(
                        "getPostsList",
                        undefined,
                        (draft) => {
                            const newPostsList = draft.data.map((postItem) =>
                                postItem.id === id
                                    ? { ...postItem, ...data }
                                    : postItem
                            );
                            draft.data = newPostsList;
                        }
                    )
                );
                const patchResultUserPosts = dispatch(
                    api.util.updateQueryData(
                        "getPostsListByUsername",
                        name,
                        (draft) => {
                            const newPostsList = draft.data.map((postItem) =>
                                postItem.id === id
                                    ? { ...postItem, ...data }
                                    : postItem
                            );
                            draft.data = newPostsList;
                        }
                    )
                );
                const patchResultUserPost = dispatch(
                    api.util.updateQueryData(
                        "getPostById",
                        `${id}`,
                        (draft) => {
                            console.log(
                                JSON.stringify(draft.data),
                                "DRAFT_DATA"
                            );
                            const newPost = { ...draft.data, ...data };
                            draft.data = newPost;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResultAllPosts.undo();
                    patchResultUserPosts.undo();
                    patchResultUserPost.undo();
                }
            },
            // invalidatesTags: (result, error, arg) => [
            //     { type: "Post", id: arg.id },
            // ],
        }),
        deletePostById: build.mutation({
            query: ({ id, name }) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(
                { id, name },
                { dispatch, queryFulfilled, getState }
            ) {
                // console.log(
                //     Object.values(getState().tweetterAPI.queries)[1].data.data,
                //     "getState in onQueryStarted in addPost"
                // );
                const patchResultAllPosts = dispatch(
                    api.util.updateQueryData(
                        "getPostsList",
                        undefined,
                        (draft) => {
                            const newPostsList = draft.data.filter(
                                (postItem) => postItem.id !== id
                            );
                            draft.data = newPostsList;
                        }
                    )
                );
                const patchResultUserPosts = dispatch(
                    api.util.updateQueryData(
                        "getPostsListByUsername",
                        name,
                        (draft) => {
                            const newPostsList = draft.data.filter(
                                (postItem) => postItem.id !== id
                            );
                            draft.data = newPostsList;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResultAllPosts.undo();
                    patchResultUserPosts.undo();
                }
            },
            invalidatesTags: [/* "Post",  */ "User"],
        }),
        addPost: build.mutation({
            query: ({ data }) => ({
                url: `posts`,
                method: "POST",
                /* body: */ data,
            }),
            async onQueryStarted({}, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPost } = await queryFulfilled;

                    const patchResultAllPosts = dispatch(
                        api.util.updateQueryData(
                            "getPostsList",
                            undefined,
                            (draft) => {
                                // console.log(
                                //     JSON.stringify(draft.data),
                                //     "DRAFT_DATA"
                                // );
                                draft.data.unshift(updatedPost.data);
                            }
                        )
                    );
                    const patchResultUserPosts = dispatch(
                        api.util.updateQueryData(
                            "getPostsListByUsername",
                            updatedPost.data.author.name,
                            (draft) => {
                                draft.data.unshift(updatedPost.data);
                            }
                        )
                    );
                } catch {}
            },

            invalidatesTags: [/* "Post",  */ "User"],
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
            async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedComment } = await queryFulfilled;

                    const patchResultUserPosts = dispatch(
                        api.util.updateQueryData(
                            "getCommentsListByPostid",
                            `${postId}`,
                            (draft) => {
                                draft.data.unshift(updatedComment.data);
                            }
                        )
                    );
                } catch {}
            },
            invalidatesTags: [/* "Comment", */ "Post"],
        }),
        updateCommentById: build.mutation({
            query: ({ id, data, postId }) => ({
                url: `comments/${id}`,
                method: "PUT",
                /* body:  */ data,
            }),
            async onQueryStarted(
                { id, data, postId },
                { dispatch, queryFulfilled, getState }
            ) {
                const patchResultComments = dispatch(
                    api.util.updateQueryData(
                        "getCommentsListByPostid",
                        `${postId}`,
                        (draft) => {
                            const newCommentsList = draft.data.map(
                                (commentItem) =>
                                    commentItem.id === id
                                        ? { ...commentItem, ...data }
                                        : commentItem
                            );
                            draft.data = newCommentsList;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResultAllPosts.undo();
                }
            },
            // invalidatesTags: (result, error, arg) => [
            //     { type: "Comment", id: arg.id },
            // ],
        }),
        deleteCommentById: build.mutation({
            query: ({ id, postId }) => ({
                url: `comments/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(
                { id, postId },
                { dispatch, queryFulfilled, getState }
            ) {
                const patchResultComments = dispatch(
                    api.util.updateQueryData(
                        "getCommentsListByPostid",
                        `${postId}`,
                        (draft) => {
                            const newCommentsList = draft.data.filter(
                                (commentItem) => commentItem.id !== id
                            );
                            draft.data = newCommentsList;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResultComments.undo();
                }
            },
            invalidatesTags: [/* "Comment", */ "Post"],
        }),
        getUserByUsername: build.query({
            // query: (name) => `/users/${name}`,
            query: (name) => ({
                url: `users/${name}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
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

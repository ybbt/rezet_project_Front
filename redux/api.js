import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
    reducerPath: "tweetterAPI",
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getPostById: build.query({
            query: (id) => `posts/${id}`,
            // keepUnusedDataFor: 5,
        }),
    }),
    endpoints: (build) => ({
        getPostsList: build.query({
            query: () => `posts`,
            // keepUnusedDataFor: 5,
        }),
    }),
    endpoints: (build) => ({
        getPostsListByUsername: build.query({
            query: (name) => `/users/${name}/posts`,
            // keepUnusedDataFor: 5,
        }),
    }),
});

// export const { useGetPostByIdQuery } = api;

// Export hooks for usage in functional components
export const {
    useGetPostByIdQuery,
    useGetPostsListQuery,
    useGetPostsListByUsernameQuery,
    util: { getRunningOperationPromises },
} = api;

// export endpoints for use in SSR
export const { getPostById, getPostsList, getPostsListByUsername } =
    api.endpoints;

import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
// import useCookies from "../hooks/useCookies";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        prepareHeaders: (headers, { getState }) => {
            // const token = "3|2Kma7djEs3J6IgOEdWdjIDxmfsXo7Yu9iyhR42wL"; //getState().auth.token;
            const token = Cookies.get("token_mytweeter");
            console.log(token, "DO в токен");
            // const token = useCookies();

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                console.log(token, "потрапив в токен");
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
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
        updatePostById: build.mutation({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        addPost: build.mutation({
            query: ({ data }) => ({
                url: `posts`,
                method: "POST",
                body: data,
            }),
        }),
        getPostsList: build.query({
            query: () => `posts`,
            // keepUnusedDataFor: 5,
        }),
        getPostsListByUsername: build.query({
            query: (name) => `/users/${name}/posts`,
            // keepUnusedDataFor: 5,
        }),
        getCommentsListByPostid: build.query({
            query: (id) => `/posts/${id}/comments`,
            // keepUnusedDataFor: 5,
        }),
        getCommentsListByPostid: build.query({
            query: (id) => `/posts/${id}/comments`,
            // keepUnusedDataFor: 5,
        }),
        // getAuthentification: build.query({
        //     query: () => `/me`,
        //     // keepUnusedDataFor: 5,
        // }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetPostByIdQuery,
    useUpdatePostByIdMutation,
    useAddPostMutation,
    useGetPostsListQuery,
    useGetPostsListByUsernameQuery,
    useGetCommentsListByPostidQuery,
    util: { getRunningOperationPromises },
} = api;

// export endpoints for use in SSR
export const {
    getPostById,
    getPostsList,
    getPostsListByUsername,
    getCommentsListByPostid,
} = api.endpoints;

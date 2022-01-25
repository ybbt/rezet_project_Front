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
        }),
    }),
});

// export const { useGetPostByIdQuery } = api;

// Export hooks for usage in functional components
export const {
    useGetPostByIdQuery,
    //   useGetPokemonListQuery,
    util: { getRunningOperationPromises },
} = api;

// export endpoints for use in SSR
export const { getPostById /* , getPokemonList */ } = api.endpoints;

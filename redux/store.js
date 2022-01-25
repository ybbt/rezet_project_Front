// import { useMemo } from "react";
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from "redux-thunk";
// import reducers from "./reducers";
// import { api } from "./api";

// let store;

// function initStore(initialState) {
//     return createStore(
//         reducers,
//         // api.reducer,
//         initialState,
//         composeWithDevTools(applyMiddleware(thunkMiddleware)),
//         composeWithDevTools(applyMiddleware(api.middleware))
//     );
// }

// export const initializeStore = (preloadedState) => {
//     let _store = store ?? initStore(preloadedState);

//     // After navigating to a page with an initial Redux state, merge that state
//     // with the current state in the store, and create a new store
//     if (preloadedState && store) {
//         _store = initStore({
//             ...store.getState(),
//             ...preloadedState,
//         });
//         // Reset the current store
//         store = undefined;
//     }

//     // For SSG and SSR always create a new store
//     if (typeof window === "undefined") return _store;
//     // Create the store once in the client
//     if (!store) store = _store;

//     return _store;
// };

// export function useStore(initialState) {
//     const store = useMemo(() => initializeStore(initialState), [initialState]);
//     return store;
// }

// ************************************
// import { configureStore } from "@reduxjs/toolkit";
// // import { pokemonSlice } from "./services/pokemonSlice";
// import { api } from "./api";

// export const store = configureStore({
//     reducer: {
//         // pokemon: pokemonSlice.reducer,
//         [api.reducerPath]: api.reducer,
//     },
//     middleware: (gDM) => gDM().concat(api.middleware),
// });
// ************************************

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { api } from "./api";

export const makeStore = () =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
        },
        middleware: (gDM) => gDM().concat(api.middleware),
    });

export const wrapper = createWrapper(makeStore, { debug: true });

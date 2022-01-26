import { combineReducers } from "redux";

// import authReducer from "./redusers/authReducer";
import { reducer as authReducer } from "./slices/authSlice.";

import userReducer from "./redusers/userReducer";
import postsReducer from "./redusers/postsReducer";
import postReducer from "./redusers/postReducer";
import commentsReducer from "./redusers/commentsReducer";
import errorReducer from "./redusers/errorReducer";

import { api } from "./api";
const reducers = {
    commentsReducer,
    postReducer,
    userReducer,
    postsReducer,

    authReducer,
    // reducer,

    errorReducer,

    [api.reducerPath]: api.reducer,
};

export default combineReducers(reducers);

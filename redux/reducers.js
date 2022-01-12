import { combineReducers } from "redux";

import authReducer from "./redusers/authReducer";
import userReducer from "./redusers/userReducer";
import postsReducer from "./redusers/postsReducer";
import postReducer from "./redusers/postReducer";
import commentsReducer from "./redusers/commentsReducer";
import errorReducer from "./redusers/errorReducer";

const reducers = {
    commentsReducer,
    postReducer,
    userReducer,
    postsReducer,
    authReducer,
    errorReducer,
};

export default combineReducers(reducers);

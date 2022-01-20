import { combineReducers } from "redux";

import authorizationReducer from "./redusers/authorizationReducer";
import activeUserReducer from "./redusers/activeUserReducer";
import postsListReducer from "./redusers/postsListReducer";
import activePostReducer from "./redusers/activePostReducer";
import commentsListReducer from "./redusers/commentsListReducer";
import errorReducer from "./redusers/errorReducer";

const reducers = {
    commentsReducer: commentsListReducer,
    postReducer: activePostReducer,
    userReducer: activeUserReducer,
    postsReducer: postsListReducer,
    authReducer: authorizationReducer,
    errorReducer,
};

export default combineReducers(reducers);

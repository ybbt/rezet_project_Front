import { combineReducers } from "redux";

import authorizationReducer from "./authorization/authorizationReducer";
import activeUserReducer from "./activeUser/activeUserReducer";
import postsListReducer from "./postsList/postsListReducer";
import activePostReducer from "./activePost/activePostReducer";
import commentsListReducer from "./commentsList/commentsListReducer";
import errorReducer from "./error/errorReducer";

const reducers = {
    commentsReducer: commentsListReducer,
    postReducer: activePostReducer,
    userReducer: activeUserReducer,
    postsReducer: postsListReducer,
    authReducer: authorizationReducer,
    errorReducer,
};

export default combineReducers(reducers);

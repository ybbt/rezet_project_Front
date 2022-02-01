import { createSlice } from "@reduxjs/toolkit";

const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        signedUser: {},
        isAuth: null,
        isLoad: false,
    },
    reducers: {
        setAuth(state, action) {
            console.log("%c setAuth", "color:green, background-color:yellow");
            state.signedUser = action.payload.signedUser;
            state.isAuth = action.payload.isAuth;
            state.isLoad = action.payload.isLoad;
        },
        setLogin(state, action) {
            console.log("setLogin");
            console.log(state.signedUser, "state in logIN -> slice");
            console.log(action.payload.signedUser, "action in logIN-> slice");
            state.isAuth = action.payload.isAuth;
        },
        setLogout(state, action) {
            console.log("setLogout");
            console.log(state.signedUser, "state in logOUT -> slice");
            console.log(action.payload, "action in logOUT -> slice");
            state.signedUser = action.payload.signedUser;
            state.isAuth = action.payload.isAuth;
        },
    },
});

// Извлекаем объект с создателями и редуктор
const { actions, reducer } = authorizationSlice;

// Извлекаем и экспортируем каждого создателя по названию
export const { setAuth, setLogin, setLogout } = actions;

// Экпортируем редуктор по умолчанию или по названию
export { /* default */ reducer };

// signedUser: payload.signedUser,
// isAuth: payload.isAuth,
// isLoad: payload.isLoad,

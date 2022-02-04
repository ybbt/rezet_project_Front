import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        signedUser: {},
        isAuth: null,
        isLoad: false,
    },
    reducers: {
        setAuth(state, action) {
            state.signedUser = action.payload.signedUser;
            state.isAuth = action.payload.isAuth;
            state.isLoad = action.payload.isLoad;
        },
        setLogin(state, action) {
            state.isAuth = action.payload.isAuth;
        },
        setLogout(state, action) {
            state.signedUser = action.payload.signedUser;
            state.isAuth = action.payload.isAuth;
            state.isLoad = action.payload.isLoad;
        },
        changeCredentials(state, action) {
            state.signedUser.first_name = action.payload.firstName;
            state.signedUser.last_name = action.payload.lastName;
        },
        changeLocation(state, action) {
            state.signedUser.lat = action.payload.lat;
            state.signedUser.lng = action.payload.lng;
        },
        changeAvatar(state, action) {
            state.signedUser.avatar_path = action.payload.avatar_path;
        },
        changeBackground(state, action) {
            state.signedUser.background_path = action.payload.background_path;
            console.log(current(state), "state in changeBackground");
        },
    },
});

// Извлекаем объект с создателями и редуктор
const { actions, reducer } = authorizationSlice;

// Извлекаем и экспортируем каждого создателя по названию
export const {
    setAuth,
    setLogin,
    setLogout,
    changeAvatar,
    changeBackground,
    changeCredentials,
    changeLocation,
} = actions;

// Экпортируем редуктор по умолчанию или по названию
export { reducer };

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authMeRedux } from "../redux/actions/authorizationActions.js";

export default function useAuthStatus() {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch();
    useEffect(async () => {
        console.log("%c useEffect for isAuthStore", "color: blue");
        await dispatch(authMeRedux());
    }, [isAuthStore]);

    // useEffect(async () => {
    //     console.log("%c useEffect single ", "color: green");
    //     await dispatch(authMeRedux());
    // }, []);
}

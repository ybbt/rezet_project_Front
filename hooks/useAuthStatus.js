import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authMeRedux } from "../redux/actions/authorizationActions.js";

export default async function useAuthStatus() {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(
            "%c useEffect for isAuthStore",
            "color: blue; background: lightblue"
        );
        await dispatch(authMeRedux());
    }, [isAuthStore]);
}

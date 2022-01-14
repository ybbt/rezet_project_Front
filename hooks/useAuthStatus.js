import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authMeRedux } from "../redux/actions/authorizationActions.js";

export default function useAuthStatus() {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(authMeRedux());
    }, [isAuthStore]);
}

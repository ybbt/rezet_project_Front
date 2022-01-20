import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthAsync } from "../redux/authorization/authorizationActions.js";

export default function useAuthStatus() {
    const isAuthStore = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch();

    useEffect(async () => {
        await dispatch(getAuthAsync());
    }, [isAuthStore]);
}

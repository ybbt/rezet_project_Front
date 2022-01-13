import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authMeRedux } from "../redux/actions/authorizationActions.js";

export default function useAuthStatus() {
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(authMeRedux());
    }, []);
}

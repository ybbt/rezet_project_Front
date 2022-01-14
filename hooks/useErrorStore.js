import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { message } from "antd";

import { clearErrorRedux } from "../redux/actions/errorActions";

export default function useErrorStore() {
    const {
        error: errorStore,
        errorMessage: errorMessageStore,
        serverResponse: serverResponseStore,
    } = useSelector((state) => state.errorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        errorStore &&
            message.error(`${serverResponseStore || errorMessageStore}`);
        dispatch(clearErrorRedux());
    }, [errorStore]);
}

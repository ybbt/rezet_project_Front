import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { message } from "antd";

import { clearError } from "../redux/error/errorActions";

export default function useErrorStore() {
    const errorStore = useSelector((state) => state.errorReducer.error);
    const statusStore = useSelector((state) => state.errorReducer.status);
    const errorMessageStore = useSelector(
        (state) => state.errorReducer.errorMessage
    );
    const serverResponseStore = useSelector(
        (state) => state.errorReducer.serverResponse
    );
    const errorDateStore = useSelector((state) => state.errorReducer.errorDate);

    const dispatch = useDispatch();

    useEffect(() => {
        errorStore &&
            message.error({
                content: `${serverResponseStore || errorMessageStore}`,
                duration: 5,
            });
    }, [errorDateStore]);

    return statusStore;
}

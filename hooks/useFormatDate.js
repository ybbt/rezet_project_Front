import { DateTime } from "luxon";
import { useMemo } from "react";

export default function useFormatDate(date, format) {
    if (!date) {
        return null;
    }
<<<<<<< HEAD
=======

>>>>>>> stage-3--stage-4_comments__with-redux-thunk___refact-redux
    return useMemo(
        () => DateTime.fromISO(date).toFormat(format),
        [date, format]
    );
}

import { DateTime } from "luxon";
import { useMemo } from "react";

export default function useFormatDate(date, format) {
    if (!date) {
        return null;
    }
    return useMemo(
        () => DateTime.fromISO(date).toFormat(format),
        [date, format]
    );
}

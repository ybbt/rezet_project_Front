import { DateTime } from "luxon";
import { useMemo } from "react";

export default function useFormatDate(date, format) {
    console.log(date, "not date in useFormatDate");
    if (!date) {
        return null;
    }
    console.log(
        new DateTime(date).toFormat(format),
        "newDate from useFormatDate"
    );
    return useMemo(() => new DateTime(date).toFormat(format), [date, format]);
}

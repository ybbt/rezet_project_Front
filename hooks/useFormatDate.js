import { DateTime } from "luxon";
import { useMemo } from "react";

export default function useFormatDate(date, format) {
    return useMemo(() => new DateTime(date).toFormat(format), [date, format]);
}

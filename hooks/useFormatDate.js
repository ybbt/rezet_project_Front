import moment from "moment";
import { useMemo } from "react";

export default function useFormatDate(date, format) {
    return useMemo(() => moment(date).format(format), [date, format]);
}

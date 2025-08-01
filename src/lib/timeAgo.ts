import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeAgo = (isoDate: string | Date) => dayjs(isoDate).fromNow();

import { parseISO, addHours } from "date-fns";

export const adjustToLocalTime = (utcDate, offset = 0) => {
  const parsedDate = parseISO(utcDate); // Parse the UTC date

  return addHours(parsedDate, offset); // Adjust by offset (GMT+6)
};

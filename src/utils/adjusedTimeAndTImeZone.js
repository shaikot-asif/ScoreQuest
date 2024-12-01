import { parseISO, addHours } from "date-fns";

export const adjustToLocalTime = (utcDate, offset = 0) => {
  const parsedDate = parseISO(utcDate); // Parse the UTC date

  console.log(parsedDate, "parse data from adjust time");
  return addHours(parsedDate, offset); // Adjust by offset (GMT+6)
};

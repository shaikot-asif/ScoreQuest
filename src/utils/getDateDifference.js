export function getDateDifference(date1, date2) {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  if (newDate1 - newDate2 <= 0) {
    return { minutes: 0, seconds: 0 };
  } else {
    const diffInMs = Math.abs(newDate2 - newDate1);

    const totalSeconds = Math.floor(diffInMs / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
  }
}

import { format, fromUnixTime } from "date-fns";

export const convertTime = (time: number | undefined) => {
  console.log("Time received:", time);
  if (!time || isNaN(time)) {
    return "Invalid time";
  }

  try {
    const sunriseDate = fromUnixTime(time);
    const formattedTime = format(sunriseDate, "HH:mm:ss");
    return formattedTime;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Error formatting time";
  }
};

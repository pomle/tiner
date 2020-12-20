import { useState, useEffect, useMemo } from "react";
import { DateTime } from "luxon";

type Unit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds"
  | "millisecond"
  | "milliseconds";

function now() {
  return DateTime.local();
}

export const useLiveTime = (unit: Unit): DateTime => {
  const initial = useMemo(now, []);

  const [time, setTime] = useState<DateTime>(initial);

  useEffect(() => {
    const nextTime = time.startOf(unit).plus({ [unit]: 1 });
    const delay = nextTime.diff(time).milliseconds;
    const timer = setTimeout(setTime, delay, nextTime);
    return () => clearTimeout(timer);
  }, [unit, time]);

  return time;
};

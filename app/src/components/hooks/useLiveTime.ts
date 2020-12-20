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
  return DateTime.utc();
}

export const useLiveTime = (unit: Unit): DateTime => {
  const initial = useMemo(now, []);

  const [time, setTime] = useState<DateTime>(initial);

  useEffect(() => {
    const delay = time
      .startOf(unit)
      .plus({ [unit]: 1 })
      .diff(time).milliseconds;
    const timer = setTimeout(() => {
      const now = DateTime.utc()
        .startOf(unit)
        .plus({ [unit]: 1 });
      setTime(now);
    }, delay);
    return () => clearTimeout(timer);
  }, [unit, time]);

  return time;
};

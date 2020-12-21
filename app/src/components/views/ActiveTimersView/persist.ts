import { DateTime, Duration } from "luxon";
import { Timer } from "types/Timer";

export function serialize(timers: Timer[]) {
  return JSON.stringify(
    timers.map((timer) => ({
      ...timer,
      acc: timer.acc.toJSON(),
      start: timer.start.toJSON(),
    }))
  );
}

export function unserialize(text: string): Timer[] {
  const values = JSON.parse(text);
  if (Array.isArray(values)) {
    return values.map((value) => ({
      ...value,
      acc: Duration.fromISO(value.acc),
      start: DateTime.fromISO(value.start),
    }));
  }
  return [];
}

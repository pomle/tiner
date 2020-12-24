import { DateTime, Duration } from "luxon";
import { Timer } from "types/Timer";
import * as emoji from "lib/emoji";

export function createTimer(start: DateTime): Timer {
  return {
    id: DateTime.utc().toFormat("x"),
    acc: Duration.fromMillis(0),
    start,
    running: true,
    label: emoji.random(),
  };
}

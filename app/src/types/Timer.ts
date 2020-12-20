import { DateTime, Duration } from "luxon";

export type Timer = {
  acc: Duration;
  start: DateTime;
  running: boolean;
  label: string;
};

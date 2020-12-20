import { DateTime, Duration } from "luxon";

export type Timer = {
  id: string;
  acc: Duration;
  start: DateTime;
  running: boolean;
  label: string;
};

import { DateTime, Duration } from "luxon";

export type Timer = {
  acc: Duration;
  start: DateTime;
  label: string;
};

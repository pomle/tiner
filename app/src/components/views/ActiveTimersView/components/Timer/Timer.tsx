import React from "react";
import { DateTime } from "luxon";

import "./Timer.css";

interface TimerProps {
  start: DateTime;
  now: DateTime;
  label: React.ReactNode;
}

const Timer: React.FC<TimerProps> = ({ start, now, label }) => {
  const elapsed = now.diff(start);

  return (
    <div className="Timer">
      <div className="time">{elapsed.toFormat("hh:mm:ss")}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default Timer;

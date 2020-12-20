import React, { useCallback, useMemo, useState } from "react";
import { DateTime, Duration } from "luxon";
import * as emoji from "lib/emoji";
import { useLiveTime } from "components/hooks/useLiveTime";
import Timer from "./components/Timer";
import "./ActiveTimersView.css";

type Timer = {
  acc: Duration;
  start: DateTime;
  label: string;
};

function createTimer(start: DateTime): Timer {
  return {
    acc: Duration.fromMillis(0),
    start,
    label: emoji.random(),
  };
}

interface ActiveTimersViewProps {}

const ActiveTimersView: React.FC<ActiveTimersViewProps> = ({}) => {
  const now = useLiveTime("second");

  const [timers, setTimers] = useState<Timer[]>([]);

  const addTimer = useCallback(() => {
    setTimers((timers) => [...timers, createTimer(now)]);
  }, [now]);

  return (
    <div className="ActiveTimersView">
      <div className="timers">
        {timers.map((timer) => {
          return (
            <div className="timer">
              <Timer start={timer.start} now={now} label={timer.label} />
            </div>
          );
        })}
      </div>
      <div className="add">
        <button type="button" onClick={addTimer}>
          +
        </button>
      </div>
    </div>
  );
};

export default ActiveTimersView;

import React, { useCallback, useMemo, useState } from "react";
import { DateTime, Duration } from "luxon";
import * as emoji from "lib/emoji";
import { useLiveTime } from "components/hooks/useLiveTime";
import TimerComp from "./components/Timer";
import { Timer } from "types/Timer";
import "./ActiveTimersView.css";

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
        {timers.map((timer, index) => {
          const handleChange = (timer: Timer) => {
            setTimers((timers) =>
              timers.map((t, i) => {
                if (index === i) {
                  return timer;
                }
                return t;
              })
            );
          };
          return (
            <div className="timer">
              <TimerComp now={now} timer={timer} onChange={handleChange} />
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

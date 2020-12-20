import React, { useCallback } from "react";
import { DateTime } from "luxon";
import * as emoji from "lib/emoji";
import { Timer } from "types/Timer";

import "./Timer.css";

interface TimerProps {
  now: DateTime;
  timer: Timer;
  onChange: (timer: Timer) => void;
}

const TimerComp: React.FC<TimerProps> = ({ now, timer, onChange }) => {
  const elapsed = timer.running
    ? now.diff(timer.start).plus(timer.acc)
    : timer.acc;

  const pause = useCallback(
    (timer: Timer) => {
      return {
        ...timer,
        acc: elapsed,
        running: false,
      };
    },
    [elapsed]
  );

  const resume = useCallback(
    (timer: Timer) => {
      return {
        ...timer,
        start: now,
        running: true,
      };
    },
    [now]
  );

  const toggle = useCallback(() => {
    if (timer.running) {
      onChange(pause(timer));
    } else {
      onChange(resume(timer));
    }
  }, [timer, onChange, pause, resume]);

  const changeLabel = useCallback(() => {
    onChange({
      ...timer,
      label: emoji.random(),
    });
  }, [timer, onChange]);

  const classNames = ["Timer"];
  if (timer.running) {
    classNames.push("running");
  } else {
    classNames.push("paused");
  }

  return (
    <div className={classNames.join(" ")}>
      <div className="time">
        <button type="button" onClick={toggle}>
          {elapsed.toFormat("hh:mm:ss")}
        </button>
      </div>
      <div className="label">
        <button type="button" onClick={changeLabel}>
          {timer.label}
        </button>
      </div>
    </div>
  );
};

export default TimerComp;

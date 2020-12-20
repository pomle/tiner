import React, { useCallback } from "react";
import { DateTime } from "luxon";
import * as emoji from "lib/emoji";
import { Timer as T } from "types/types";

import "./Timer.css";

interface TimerProps {
  now: DateTime;
  timer: T;
  onChange: (timer: T) => void;
}

const Timer: React.FC<TimerProps> = ({ now, timer, onChange }) => {
  const elapsed = now.diff(timer.start);

  const handleLabel = useCallback(() => {
    onChange({
      ...timer,
      label: emoji.random(),
    });
  }, [onChange]);

  return (
    <div className="Timer">
      <div className="time">{elapsed.toFormat("hh:mm:ss")}</div>
      <div className="label">
        <button type="button" onClick={handleLabel}>
          {timer.label}
        </button>
      </div>
    </div>
  );
};

export default Timer;

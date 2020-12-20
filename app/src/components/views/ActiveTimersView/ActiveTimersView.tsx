import React, { useCallback, useState } from "react";
import { DateTime, Duration } from "luxon";
import * as emoji from "lib/emoji";
import { useLiveTime } from "components/hooks/useLiveTime";
import SwipeList from "components/ui/SwipeList";
import SwipeItem from "components/ui/SwipeList/components/SwipeItem";
import TimerComp from "./components/Timer";
import { Timer } from "types/Timer";
import "./ActiveTimersView.css";

function createTimer(start: DateTime): Timer {
  return {
    id: start.toFormat("x"),
    acc: Duration.fromMillis(0),
    start,
    running: true,
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
        <SwipeList>
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

            const handleRemove = () => {
              setTimers((timers) => timers.filter((t) => t.id !== timer.id));
            };

            return (
              <SwipeItem key={timer.id} onSwipeAway={handleRemove}>
                <div className="timer">
                  <TimerComp now={now} timer={timer} onChange={handleChange} />
                </div>
              </SwipeItem>
            );
          })}
        </SwipeList>
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

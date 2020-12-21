import React, { useCallback } from "react";
import { DateTime, Duration } from "luxon";
import * as emoji from "lib/emoji";
import { useLiveTime } from "components/hooks/useLiveTime";
import SwipeList from "components/ui/SwipeList";
import SwipeItem from "components/ui/SwipeList/components/SwipeItem";
import TimerComp from "./components/Timer";
import { Timer } from "types/Timer";
import { usePersistedState } from "components/hooks/usePersistedState";
import { serialize, unserialize } from "./persist";
import "./ActiveTimersView.css";

let counter = 0;

function createTimer(start: DateTime): Timer {
  counter += 1;
  return {
    id: counter.toString(),
    acc: Duration.fromMillis(0),
    start,
    running: true,
    label: emoji.random(),
  };
}

interface ActiveTimersViewProps {}

const ActiveTimersView: React.FC<ActiveTimersViewProps> = () => {
  const now = useLiveTime("second");

  const [timers, setTimers] = usePersistedState<Timer[]>(
    "timers",
    serialize,
    unserialize,
    []
  );

  const addTimer = useCallback(() => {
    setTimers((timers) => [...timers, createTimer(now)]);
  }, [now, setTimers]);

  const updateTimer = useCallback(
    (timer: Timer) => {
      setTimers((timers) => {
        return timers.map((t) => {
          if (t.id === timer.id) {
            return timer;
          }
          return t;
        });
      });
    },
    [setTimers]
  );

  const removeTimer = useCallback(
    (timer: Timer) => {
      setTimers((timers) => timers.filter((t) => t.id !== timer.id));
    },
    [setTimers]
  );

  return (
    <div className="ActiveTimersView">
      <div className="timers">
        <SwipeList>
          {timers.map((timer) => {
            const handleRemove = () => {
              removeTimer(timer);
            };

            return (
              <SwipeItem key={timer.id} onSwipeAway={handleRemove}>
                <div className="timer">
                  <TimerComp now={now} timer={timer} onChange={updateTimer} />
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
      <div className="instructions">
        <ul>
          <li>Plus to add</li>
          <li>Tap to pause</li>
          <li>Swipe to remove</li>
        </ul>
      </div>
    </div>
  );
};

export default ActiveTimersView;

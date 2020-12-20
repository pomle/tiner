import React, { useCallback, useRef, useState } from "react";
import "./SwipeItem.css";

interface SwipeItemProps {
  onSwipeAway: () => void;
}

const SwipeItem: React.FC<SwipeItemProps> = ({ onSwipeAway, children }) => {
  const [offsetX, setOffsetX] = useState<number>(0);
  const grab = useRef<PointerEvent>();
  const history = useRef<PointerEvent[]>([]);
  const speed = useRef<number>(0);

  const handleDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      grab.current = event.nativeEvent;
      history.current.push(event.nativeEvent);
    },
    []
  );

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!grab.current) {
        return;
      }

      history.current.push(event.nativeEvent);

      const offsetX = event.clientX - grab.current.clientX;
      setOffsetX(offsetX);

      const events = history.current.slice(-1);
      speed.current = events[0].movementX;
    },
    []
  );

  const handleUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (Math.abs(speed.current) > 10) {
        const deltaX = speed.current;
        let done = false;
        const move = () => {
          setOffsetX((offsetX) => {
            if (Math.abs(offsetX) > 600) {
              done = true;
            }
            return offsetX + deltaX;
          });
          if (done) {
            onSwipeAway();
          } else {
            requestAnimationFrame(move);
          }
        };
        requestAnimationFrame(move);
      } else {
        setOffsetX(0);
      }
    },
    [onSwipeAway]
  );

  const style = {
    transform: `translateX(${offsetX}px)`,
    transition: offsetX === 0 ? "transform 0.3s ease" : "none",
  };

  return (
    <div
      className="SwipeItem"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      style={style}
    >
      {children}
    </div>
  );
};

export default SwipeItem;

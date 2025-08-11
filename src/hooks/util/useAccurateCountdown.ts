import {useEffect, useRef, useState} from "react";

export const useAccurateCountdown = () => {
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = (seconds: number) => {
    const end = new Date(Date.now() + (seconds * 1000));
    setEndTime(end);
    setCountdown(seconds);
  };

  const stop = () => {
    setEndTime(null);
    setCountdown(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!endTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const remaining = Math.max(0, Math.ceil((endTime.getTime() - now.getTime()) / 1000));
      setCountdown(remaining);

      if (remaining === 0) {
        stop();
      }
    };

    // Update immediately
    updateCountdown();

    // Then update every 100ms
    intervalRef.current = setInterval(updateCountdown, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endTime]);

  return { countdown, start, stop, isActive: !!endTime };
};

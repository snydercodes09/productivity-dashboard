import { useState, useEffect, useRef, useCallback } from 'react';

export default function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState('focus');
  const intervalRef = useRef(null);

  const updateDisplay = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [timeLeft]);

  const progress = totalTime > 0 ? timeLeft / totalTime : 0;

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggle = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
    const durations = { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };
    const t = durations[mode] || 25 * 60;
    setTimeLeft(t);
    setTotalTime(t);
  }, [mode]);

  const changeMode = useCallback((newMode) => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setMode(newMode);
    const durations = { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };
    const t = durations[newMode] || 25 * 60;
    setTimeLeft(t);
    setTotalTime(t);
  }, []);

  return {
    displayTime: updateDisplay(),
    progress,
    running,
    mode,
    toggle,
    reset,
    changeMode,
  };
}

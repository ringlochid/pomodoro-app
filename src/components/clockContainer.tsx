import { useCallback, useEffect, type JSX } from "react";
import { useTime } from "../hooks/useTime";

export function ProgressRing({ progress }: { progress: number }): JSX.Element {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 249 249"
      className="pointer-events-none absolute h-[84%] w-[84%] "
    >
      <circle
        cx="124.5"
        cy="124.5"
        r={radius}
        className="stroke-preset-1"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
}

export function ActionButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: "START" | "PAUSE" | "RESUME" | "RESTART";
}): JSX.Element {
  return (
    <button
      className="timer-control-text appearance-none cursor-pointer text-xs transition-colors hover:text-clock-progress-ring md:text-sm lg:text-base"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function TimerContainer({
  time,
  handleTimerAction,
  buttonLabel,
}: {
  time: string;
  handleTimerAction: () => void;
  buttonLabel: "START" | "PAUSE" | "RESUME" | "RESTART";
}): JSX.Element {
  return (
    <div className="absolute inset-4 grid place-items-center rounded-full bg-blue-900 md:inset-5 lg:inset-6">
      <div className="flex flex-col items-center gap-4 md:gap-5">
        <h2 className="timer-text text-7xl md:text-8xl lg:text-9xl">{time}</h2>
        <ActionButton onClick={handleTimerAction} label={buttonLabel} />
      </div>
    </div>
  );
}

export function ClockContainer(): JSX.Element {
  const { timeState, dispatch } = useTime();
  const { totalTime, remainingTime, isRunning, isCompleted } = timeState;
  const progress =
    totalTime === 0 ? 0 : (totalTime - remainingTime) / totalTime;
  const hasStarted = remainingTime < totalTime;
  const buttonLabel: "START" | "PAUSE" | "RESUME" | "RESTART" = isCompleted
    ? "RESTART"
    : isRunning
      ? "PAUSE"
      : hasStarted
        ? "RESUME"
        : "START";

  const formattedTime = `${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, "0")}`;

  const handleTimerAction = useCallback(() => {
    if (isCompleted) {
      dispatch({ type: "restartTimer" });
      return;
    }

    if (isRunning) {
      dispatch({ type: "pauseTimer" });
      return;
    }

    dispatch({ type: "startTimer" });
  }, [dispatch, isCompleted, isRunning]);

  useEffect(() => {
    if (!isRunning || isCompleted) {
      return () => {};
    }

    const timer = setInterval(() => {
      dispatch({ type: "reduceTimer" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, isCompleted, isRunning]);

  return (
    <div className="clock-container relative grid aspect-square size-75 place-items-center rounded-full md:size-102 lg:size-120">
      <TimerContainer
        time={formattedTime}
        handleTimerAction={handleTimerAction}
        buttonLabel={buttonLabel}
      />
      <ProgressRing progress={progress} />
    </div>
  );
}

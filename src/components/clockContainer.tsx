import type { JSX } from "react";
import { useSettingEffect } from "../hooks/useSetting";

export function ProgressRing({ progress }: { progress: number }): JSX.Element {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 249 249"
      className="absolute z-100 w-[84%] h-[84%]"
    >
      <circle
        cx="124.5"
        cy="124.5"
        r={radius}
        className="stroke-preset-1 z-100"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
}

export function PauseButton(): JSX.Element {
  return <button className="appearence-none text-preset-9">PAUSE</button>;
}

export function TimerContainer(): JSX.Element {
  return (
    <div className="grid aspect-square size-[16.73781rem] rounded-full place-items-center bg-blue-900">
      <div className="flex flex-col items-center justify-center gap-0">
        <h2 className="text-preset-8">25:00</h2>
        <PauseButton />
      </div>
    </div>
  );
}

export function ClockContainer(): JSX.Element {
  useSettingEffect();
  return (
    <div className="grid place-items-center aspect-square relative gap-0 size-75 clock-container">
      <TimerContainer />
      <ProgressRing progress={0.75} />
    </div>
  );
}

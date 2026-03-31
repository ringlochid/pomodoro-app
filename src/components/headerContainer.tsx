import { useCallback, type JSX } from "react";
import { useTime } from "../hooks/useTime";
import type { TimeMode } from "../contexts/timeContext";
import { useSetting } from "../hooks/useSetting";

export interface RadioOption {
  id: string;
  value: string;
  title: string;
}

export function RadioButton({
  id,
  name,
  value,
  title,
  currentValue,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  title: string;
  currentValue: string;
  onChange?: (value: TimeMode) => void;
}): JSX.Element {
  return (
    <div className="flex-1">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="sr-only peer"
        checked={currentValue === value}
        onChange={(event) => onChange?.(event.target.value as TimeMode)}
      />
      <label
        htmlFor={id}
        className="flex h-12 min-w-25 items-center justify-center rounded-full px-4 text-center text-xs font-bold text-blue-100 transition-colors md:h-14 md:min-w-28 md:px-5 md:text-sm lg:min-w-32 lg:px-6 peer-checked:bg-clock-progress-ring peer-checked:text-blue-850"
      >
        <span>{title}</span>
      </label>
    </div>
  );
}

export function RadioGroup({
  name,
  options,
  currentValue,
  onChange,
}: {
  name: string;
  options: RadioOption[];
  currentValue: string;
  onChange?: (value: TimeMode) => void;
}): JSX.Element {
  return (
    <div className="inline-flex w-full items-center justify-center rounded-full bg-blue-900 p-2 md:p-2.5">
      {options.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          name={name}
          value={option.value}
          title={option.title}
          currentValue={currentValue}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export function HeaderContainer(): JSX.Element {
  const { timeState, dispatch: timeDispatch } = useTime();
  const { currentMode } = timeState;

  const { settingState } = useSetting();

  const options = [
    { id: "pomodoro", value: "pomodoro", title: "pomodoro" },
    { id: "short-break", value: "short-break", title: "short break" },
    { id: "long-break", value: "long-break", title: "long break" },
  ];

  const changedMode = useCallback(
    (nextMode: TimeMode) => {
      switch (nextMode) {
        case "pomodoro":
          timeDispatch({
            type: "resetTimer",
            nextState: {
              total: settingState.pomodoroDuration * 60,
              mode: "pomodoro",
            },
          });
          break;
        case "short-break":
          timeDispatch({
            type: "resetTimer",
            nextState: {
              total: settingState.shortBreakDuration * 60,
              mode: "short-break",
            },
          });
          break;
        case "long-break":
          timeDispatch({
            type: "resetTimer",
            nextState: {
              total: settingState.longBreakDuration * 60,
              mode: "long-break",
            },
          });
          break;
        default:
          timeDispatch({
            type: "resetTimer",
            nextState: {
              total: settingState.pomodoroDuration * 60,
              mode: "pomodoro",
            },
          });
      }
    },
    [
      timeDispatch,
      settingState.pomodoroDuration,
      settingState.shortBreakDuration,
      settingState.longBreakDuration,
    ],
  );

  return (
    <div className="flex w-full max-w-82 flex-col items-center gap-8 md:max-w-140 md:gap-12 lg:gap-14">
      <h1 className="font-sans text-2xl font-bold text-blue-100 md:text-3xl lg:text-4xl">
        pomodoro
      </h1>
      <RadioGroup
        name="timer-type"
        options={options}
        currentValue={currentMode}
        onChange={changedMode}
      />
    </div>
  );
}

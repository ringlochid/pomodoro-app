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
    <div>
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
        className="grid h-12 w-[6.56rem] place-items-center rounded-[1.96875rem] bg-blue-900 text-preset-7 text-blue-100 peer-checked:bg-red-400 peer-checked:text-blue-850"
      >
        <p>{title}</p>
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
    <div className="w-full justify-center items-center rounded-[1.96875rem] flex bg-blue-900 gap-0">
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
    <div className="w-[88svw] flex flex-col gap-10 items-center justify-center">
      <h1 className="text-preset-6">pomodoro</h1>
      <RadioGroup
        name="timer-type"
        options={options}
        currentValue={currentMode}
        onChange={changedMode}
      />
    </div>
  );
}

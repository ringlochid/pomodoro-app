import type { JSX } from "react";

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
}: {
  id: string;
  name: string;
  value: string;
  title: string;
  currentValue: string;
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
}: {
  name: string;
  options: RadioOption[];
  currentValue: string;
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
        />
      ))}
    </div>
  );
}

export function HeaderContainer(): JSX.Element {
  const options = [
    { id: "pomodoro", value: "pomodoro", title: "pomodoro" },
    { id: "short-break", value: "short-break", title: "short break" },
    { id: "long-break", value: "long-break", title: "long break" },
  ];
  return (
    <div className="w-[88svw] flex flex-col gap-10 items-center justify-center">
      <h1 className="text-preset-6">pomodoro</h1>
      <RadioGroup name="timer-type" options={options} currentValue="pomodoro" />
    </div>
  );
}

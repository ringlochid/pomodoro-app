import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type JSX,
} from "react";
import { useSetting } from "../hooks/useSetting";
import { useTime } from "../hooks/useTime";

type RadioGroupType = "font" | "color";

type FontType = "Sans" | "Serif" | "Mono";

type ColorType = "red" | "cyan" | "purple";

export interface RadioOption {
  id: string;
  value: FontType | ColorType;
}

type RadioGroupConfig = {
  checkedClass: string;
  uncheckedClass: string;
  textClass?: Record<FontType, string>;
  bgClass?: Record<ColorType, string>;
  isChecked: (option: RadioOption, currentValue: string) => boolean;
};

const radioGroupConfig: Record<RadioGroupType, RadioGroupConfig> = {
  font: {
    checkedClass: "bg-blue-900 text-white",
    uncheckedClass: "bg-blue-50 text-blue-850 opacity-73",
    textClass: {
      Sans: "font-sans",
      Serif: "font-serif",
      Mono: "font-mono",
    },
    isChecked: (option, currentValue) => option.value === currentValue,
  },
  color: {
    checkedClass: "",
    uncheckedClass: "",
    bgClass: {
      red: "bg-red-400",
      cyan: "bg-cyan-300",
      purple: "bg-purple-400",
    },
    isChecked: (option, currentValue) => option.value === currentValue,
  },
};

export function CloseButton({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      name="close"
      className="m-0 grid size-3.5 cursor-pointer appearance-none place-items-center border-0 bg-transparent p-0 text-blue-900/50 transition-colors hover:text-blue-900 md:size-4"
      onClick={onClick}
      aria-label="close button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.7279 1.41421L11.3137 0L6.36396 4.94975L1.41421 0L0 1.41421L4.94975 6.36396L0 11.3137L1.41421 12.7279L6.36396 7.77817L11.3137 12.7279L12.7279 11.3137L7.77817 6.36396L12.7279 1.41421Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export function ArrowButton({
  isUp,
  onClick,
}: {
  isUp: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className="m-0 grid h-4 w-4 cursor-pointer appearance-none place-items-center border-0 bg-transparent p-0"
      aria-label="change time button"
      onClick={onClick}
    >
      {isUp ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
        >
          <path
            d="M0.554688 5.20184L6.55469 1.20184L12.5547 5.20184"
            stroke="#BBBDCB"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
        >
          <path
            d="M0.554688 0.832031L6.55469 4.83203L12.5547 0.832031"
            stroke="#BBBDCB"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
}

export function NumberInput({
  id,
  title,
  defaultValue,
  handleChange,
}: {
  id: string;
  title: string;
  defaultValue: number;
  handleChange: (id: string, value: number) => void;
}): JSX.Element {
  const [value, setValue] = useState(defaultValue);

  const handleUpClick = useCallback(() => {
    setValue((prevValue) => Math.min(prevValue + 1, 60));
  }, [setValue]);

  const handleDownClick = useCallback(() => {
    setValue((prevValue) => Math.max(prevValue - 1, 1));
  }, [setValue]);

  useEffect(() => {
    handleChange(id, value);
  }, [id, value, handleChange]);

  return (
    <div className="flex w-full items-center justify-between gap-4 md:flex-col md:items-start md:gap-2">
      <label htmlFor={id} className="text-xs font-bold text-blue-900/40">
        {title}
      </label>
      <div className="flex h-10 w-35 items-center rounded-xl bg-blue-50 px-4 py-3">
        <input
          type="text"
          id={id}
          name="id"
          value={value}
          min={1}
          max={60}
          readOnly
          inputMode="numeric"
          className="block min-w-0 flex-1 bg-transparent text-sm font-bold text-blue-900 outline-none"
        />
        <div className="ml-4 flex shrink-0 flex-col items-center gap-0.5">
          <ArrowButton isUp={true} onClick={handleUpClick} />
          <ArrowButton isUp={false} onClick={handleDownClick} />
        </div>
      </div>
    </div>
  );
}

export function RadioGroup({
  type,
  name,
  options,
  currentValue,
  onChange,
}: {
  type: RadioGroupType;
  name: string;
  options: RadioOption[];
  currentValue: string;
  onChange?: (value: string) => void;
}): JSX.Element {
  const config = radioGroupConfig[type];

  return (
    <div className="flex w-full items-center justify-center gap-4 md:w-auto">
      {options.map((option) => {
        const isChecked = config.isChecked(option, currentValue);

        return (
          <div key={option.id}>
            <label
              htmlFor={option.id}
              className={`grid size-10 place-items-center rounded-full transition-colors ${isChecked ? config.checkedClass : config.uncheckedClass} ${type === "color" ? config.bgClass?.[option.value as ColorType] : ""}`}
            >
              {type === "color" && isChecked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                >
                  <path
                    d="M0.707031 5.20709L4.65966 9.15972L13.1123 0.707092"
                    stroke="#161932"
                    strokeWidth="2"
                  />
                </svg>
              )}
              {type === "font" && (
                <p
                  className={config.textClass?.[option.value as FontType] || ""}
                >
                  Aa
                </p>
              )}
            </label>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={(event) => onChange?.(event.target.value)}
              aria-label={option.value}
              className="sr-only peer"
            />
          </div>
        );
      })}
    </div>
  );
}

export function HeaderContainer({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}): JSX.Element {
  return (
    <div className="flex w-full items-center justify-between px-6 md:px-10">
      <h2 className="text-2xl font-bold text-blue-900 md:text-3xl">Settings</h2>
      <CloseButton onClick={handleCloseModal} />
    </div>
  );
}

export function FormContainer({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}): JSX.Element {
  const { settingState, dispatch: settingDispatch } = useSetting();

  const [pomodoroTime, setPomodoroTime] = useState(
    settingState.pomodoroDuration,
  );
  const [shortBreakTime, setShortBreakTime] = useState(
    settingState.shortBreakDuration,
  );
  const [longBreakTime, setLongBreakTime] = useState(
    settingState.longBreakDuration,
  );

  const [selectedFont, setSelectedFont] = useState<FontType>(settingState.font);
  const [selectedColor, setSelectedColor] = useState<ColorType>(
    settingState.color,
  );

  const { dispatch: timeDispatch } = useTime();

  const handleNumberInputChange = useCallback((id: string, value: number) => {
    switch (id) {
      case "pomodoro":
        setPomodoroTime(value);
        break;
      case "shortBreak":
        setShortBreakTime(value);
        break;
      case "longBreak":
        setLongBreakTime(value);
        break;
    }
  }, []);

  const handleFontChange = useCallback((value: string) => {
    setSelectedFont(value as FontType);
  }, []);

  const handleColorChange = useCallback((value: string) => {
    setSelectedColor(value as ColorType);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newState = {
        pomodoroDuration: pomodoroTime,
        shortBreakDuration: shortBreakTime,
        longBreakDuration: longBreakTime,
        font: selectedFont,
        color: selectedColor,
      };

      let durationChanged = false;

      if (
        pomodoroTime !== settingState.pomodoroDuration ||
        shortBreakTime !== settingState.shortBreakDuration ||
        longBreakTime !== settingState.longBreakDuration
      ) {
        durationChanged = true;
      }

      settingDispatch({
        type: "submitSettings",
        payload: newState,
      });

      if (durationChanged) {
        timeDispatch({
          type: "resetTimer",
          nextState: {
            total: pomodoroTime * 60,
            mode: "pomodoro",
          },
        });
      }
      handleCloseModal();
    },
    [
      pomodoroTime,
      shortBreakTime,
      longBreakTime,
      selectedFont,
      selectedColor,
      settingState,
      settingDispatch,
      timeDispatch,
      handleCloseModal,
    ],
  );

  const FontOptions = [
    { id: "font-sans", value: "Sans" as FontType },
    { id: "font-serif", value: "Serif" as FontType },
    { id: "font-mono", value: "Mono" as FontType },
  ];

  const ColorOptions = [
    { id: "color-red", value: "red" as ColorType },
    { id: "color-blue", value: "cyan" as ColorType },
    { id: "color-green", value: "purple" as ColorType },
  ];
  return (
    <form className="relative flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 px-6 pb-14 md:px-10 md:pb-16">
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="sr-only">Time settings</legend>
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-xs font-bold tracking-[0.3em] text-blue-900 md:text-left">
              TIME (MINUTES)
            </h2>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-5">
              <NumberInput
                id="pomodoro"
                title="Pomodoro"
                defaultValue={settingState.pomodoroDuration}
                handleChange={handleNumberInputChange}
              />
              <NumberInput
                id="shortBreak"
                title="Short Break"
                defaultValue={settingState.shortBreakDuration}
                handleChange={handleNumberInputChange}
              />
              <NumberInput
                id="longBreak"
                title="Long Break"
                defaultValue={settingState.longBreakDuration}
                handleChange={handleNumberInputChange}
              />
            </div>
          </div>
        </fieldset>

        <div className="h-px w-full bg-gray-200" />

        <fieldset className="m-0 flex min-w-0 flex-col gap-4 border-0 p-0">
          <legend className="sr-only">Font settings</legend>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-center text-xs font-bold tracking-[0.3em] text-blue-900 md:text-left">
              FONT
            </h2>
            <RadioGroup
              type="font"
              name="font"
              options={FontOptions}
              currentValue={selectedFont}
              onChange={handleFontChange}
            />
          </div>
        </fieldset>

        <div className="h-px w-full bg-gray-200" />

        <fieldset className="m-0 flex min-w-0 flex-col gap-4 border-0 p-0">
          <legend className="sr-only">Color settings</legend>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-center text-xs font-bold tracking-[0.3em] text-blue-900 md:text-left">
              COLOR
            </h2>
            <RadioGroup
              type="color"
              name="color"
              options={ColorOptions}
              currentValue={selectedColor}
              onChange={handleColorChange}
            />
          </div>
        </fieldset>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <button
          type="submit"
          className="grid h-13.25 w-35 appearance-none place-items-center rounded-full border-0 bg-red-400 p-0 text-white transition-opacity hover:opacity-90"
        >
          <p className="text-base font-bold">Apply</p>
        </button>
      </div>
    </form>
  );
}

export function ModalContainer({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}): JSX.Element {
  return (
    <div className="flex w-full max-w-82 flex-col gap-4 rounded-3xl bg-white pt-6 shadow-2xl md:max-w-135 md:pt-8">
      <HeaderContainer handleCloseModal={handleCloseModal} />
      <div className="h-px w-full bg-gray-200" />
      <FormContainer handleCloseModal={handleCloseModal} />
    </div>
  );
}

import { createContext } from "react";

export type FontType = "Sans" | "Serif" | "Mono";

export type ColorType = "red" | "cyan" | "purple";

export interface SettingStateType {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  font: FontType;
  color: ColorType;
}

export interface SettingActionPayloadType {
  pomodoroDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  font?: FontType;
  color?: ColorType;
}

export interface SubmitSettingAction {
  type: "submitSettings";
  payload: SettingActionPayloadType | null;
}

export type SettingActionType = SubmitSettingAction;

export interface SettingContextType {
  settingState: SettingStateType;
  dispatch: React.Dispatch<SettingActionType>;
}

export const SettingContext = createContext<SettingContextType | null>(null);

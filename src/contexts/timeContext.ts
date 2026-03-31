import { createContext } from "react";

export type TimeMode = "pomodoro" | "shortBreak" | "longBreak";

export interface TimeStateType {
  currentMode: TimeMode;
  totalTime: number;
  remainingTime: number;
  isRunning: boolean;
  isCompleted: boolean;
}

export interface resetProps {
  total: number;
  mode: TimeMode;
}

export interface startTimerAction {
  type: "startTimer";
}

export interface pauseTimerAction {
  type: "pauseTimer";
}

export interface resetTimerAction {
  type: "resetTimer";
  nextState: TimeStateType;
}

export interface restartTimerAction {
  type: "restartTimer";
}

export type TimeActionType =
  | startTimerAction
  | pauseTimerAction
  | resetTimerAction
  | restartTimerAction;

export interface TimeContextType {
  timeState: TimeStateType;
  dispatch: React.Dispatch<TimeActionType>;
}

export const TimeContext = createContext<TimeContextType | null>(null);

import { createContext } from "react";

export type TimeMode = "pomodoro" | "short-break" | "long-break";

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

export interface reduceTimerAction {
  type: "reduceTimer";
}

export interface pauseTimerAction {
  type: "pauseTimer";
}

export interface resetTimerAction {
  type: "resetTimer";
  nextState: resetProps;
}

export interface restartTimerAction {
  type: "restartTimer";
}

export type TimeActionType =
  | startTimerAction
  | pauseTimerAction
  | reduceTimerAction
  | resetTimerAction
  | restartTimerAction;

export interface TimeContextType {
  timeState: TimeStateType;
  dispatch: React.Dispatch<TimeActionType>;
}

export const TimeContext = createContext<TimeContextType | null>(null);

import { useReducer } from "react";
import { TimeContext } from "../contexts/timeContext";
import type { TimeActionType, TimeStateType } from "../contexts/timeContext";

const initialState: TimeStateType = {
  currentMode: "pomodoro",
  totalTime: 1500,
  remainingTime: 1500,
  isRunning: false,
  isCompleted: false,
};

const reducer = (state: TimeStateType, action: TimeActionType) => {
  switch (action.type) {
    case "startTimer":
      return {
        ...state,
        isRunning: true,
        isCompleted: false,
      };

    case "reduceTimer": {
      const newRemainingTime = Math.max(state.remainingTime - 1, 0);

      if (newRemainingTime === 0) {
        return {
          ...state,
          remainingTime: 0,
          isRunning: false,
          isCompleted: true,
        };
      }

      return {
        ...state,
        remainingTime: newRemainingTime,
      };
    }

    case "pauseTimer":
      return {
        ...state,
        isRunning: false,
      };

    case "resetTimer":
      return {
        ...state,
        totalTime: action.nextState.total,
        remainingTime: action.nextState.total,
        currentMode: action.nextState.mode,
        isRunning: false,
        isCompleted: false,
      };

    case "restartTimer":
      return {
        ...state,
        remainingTime: state.totalTime,
        isRunning: false,
        isCompleted: false,
      };

    default:
      throw new Error("unknown action type");
  }
};

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [timeState, dispatch] = useReducer(reducer, initialState);

  return (
    <TimeContext.Provider value={{ timeState, dispatch }}>
      {children}
    </TimeContext.Provider>
  );
}

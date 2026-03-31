import { useReducer } from "react";
import type {
  SettingStateType,
  SettingActionType,
} from "../contexts/settingContext";

import { SettingContext } from "../contexts/settingContext";

const reducer = (state: SettingStateType, action: SettingActionType) => {
  switch (action.type) {
    case "submitSettings":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error("unknown action type");
  }
};

const initialState: SettingStateType = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  font: "Sans",
  color: "red",
};

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [settingState, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingContext.Provider value={{ settingState, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
}

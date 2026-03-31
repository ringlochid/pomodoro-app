import { useContext, useEffect } from "react";
import { SettingContext } from "../contexts/settingContext";

export function useSetting() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider");
  }
  return context;
}

export function useSettingEffect() {
  const { settingState } = useSetting();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.color = settingState.color;
    root.dataset.font = settingState.font;
  }, [settingState.color, settingState.font]);
}

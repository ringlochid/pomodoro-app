import { useContext } from "react";
import { TimeContext } from "../contexts/timeContext";

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};

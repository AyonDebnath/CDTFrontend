import { createContext } from "react";

export const WindowContext = createContext({
  navVisi: true,
  navSwitch: true,
  visiToggler: () => {},
  switchToggler: () => {},
});

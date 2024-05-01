import { createContext } from "react";

export const AppDelContext = createContext({
  show: true,
  showToggler: () => {},
});

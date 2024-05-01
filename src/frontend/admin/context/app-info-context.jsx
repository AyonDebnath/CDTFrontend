import { createContext } from "react";

export const AppInfoContext = createContext({
  show: true,
  showToggler: () => {},
});

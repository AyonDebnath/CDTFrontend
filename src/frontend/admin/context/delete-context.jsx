import { createContext } from "react";

export const DelContext = createContext({
  show: true,
  showToggler: () => {},
});

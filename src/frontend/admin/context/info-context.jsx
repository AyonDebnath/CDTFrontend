import { createContext } from "react";

export const InfoContext = createContext({
  show: true,
  showToggler: () => {},
});

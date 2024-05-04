import { createContext } from "react";

export const InfoModalContext = createContext({
  show: false,
  showToggler: () => {},
});

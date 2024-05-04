import { createContext } from "react";

export const ConfirmContext = createContext({
  show: false,
  showToggler: () => {},
});

import { createContext } from "react";

export const ShowContext = createContext({
  show: true,
  showToggler: () => {},
});

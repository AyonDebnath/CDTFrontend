import { createContext } from "react";

export const AssessmentModalContext = createContext({
  show: false,
  showToggler: () => {},
});

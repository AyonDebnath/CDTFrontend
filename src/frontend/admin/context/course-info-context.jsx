import { createContext } from "react";

export const CourseInfoContext = createContext({
  show: true,
  showToggler: () => {},
});

import { createContext } from "react";

export const CourseDeleteContext = createContext({
  show: false,
  showToggler: () => {},
});

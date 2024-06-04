import { createContext } from "react";

export const UserCourseContext = createContext({
  show: true,
  showToggler: () => {},
});

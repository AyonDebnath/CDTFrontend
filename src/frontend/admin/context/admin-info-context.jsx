import { createContext } from "react";

export const AdminInfoContext = createContext({
  show: true,
  showToggler: () => {},
});

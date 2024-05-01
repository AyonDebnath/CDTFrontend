import { createContext } from "react";

export const AdminEditContext = createContext({
  show: true,
  showToggler: () => {},
});

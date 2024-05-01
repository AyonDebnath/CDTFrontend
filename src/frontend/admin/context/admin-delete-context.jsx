import { createContext } from "react";

export const AdminDeleteContext = createContext({
  show: true,
  showToggler: () => {},
});

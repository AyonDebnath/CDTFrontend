import { createContext } from "react";

export const UserEditContext = createContext({
  show: true,
  showToggler: () => {},
});

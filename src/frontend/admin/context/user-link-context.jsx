import { createContext } from "react";

export const UserLinkContext = createContext({
  show: true,
  showToggler: () => {},
});

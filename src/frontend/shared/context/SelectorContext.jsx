import { createContext } from "react";

export const SelectorContext = createContext({
  val: "true",
  setVal: () => {},
});

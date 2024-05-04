import { createContext } from "react";

export const PaymentModalContext = createContext({
  payNow: false,
  payToggler: () => {},
});

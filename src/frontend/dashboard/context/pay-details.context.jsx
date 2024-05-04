import { createContext } from "react";

export const PaymentDetailsContext = createContext({
  due: null,
  paid: false,
  paymentStatus: "UNPAID",
  paidDets: () => {},
});

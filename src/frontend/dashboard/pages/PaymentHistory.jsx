import PaymentDetails from "../features/payment/PaymentDetails";
import PageTitle from "../features/user-body/PageTitle";

export default function PaymentHistory() {
  return (
    <>
      <PageTitle pageName="Payment History" />
      <PaymentDetails />
    </>
  );
}

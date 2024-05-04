import { useContext, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import PropTypes from "prop-types";

import { AuthContext } from "../../shared/context/auth-context";
import { PaymentModalContext } from "../context/payment-context";

import { PaymentDetailsContext } from "../context/pay-details.context";
import { SiTruenas } from "react-icons/si";

export default function CheckoutAppointment({ due }) {
  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const pay = useContext(PaymentDetailsContext);
  const payShow = useContext(PaymentModalContext);

  const paymentElementOptions = {
    layout: "tabs",
    paymentMethodOrder: ["card"],
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handlePaySubmit = async (event) => {
    event.preventDefault();
    if (elements == null || stripe == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${auth.userId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        pay.paidDets(due, true, "PAID");
        payShow.payToggler(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="px-4">
      <PaymentElement options={paymentElementOptions} />
      <button onClick={handlePaySubmit} disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

CheckoutAppointment.propTypes = {
  due: PropTypes.number,
};

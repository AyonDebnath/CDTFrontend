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
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function CheckoutAppointment({
  due,
  lesson,
  courseName,
  duration,
  extraPay,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { sendRequest } = useHttpClient();

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
        if (lesson) {
          try {
            const formData = new FormData();
            formData.append("lessons", lesson);
            formData.append("courseName", courseName);
            formData.append("amount", due);
            formData.append("duration", duration);
            await sendRequest(
              `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user-lesson/${
                auth.userId
              }`,
              "POST",
              formData,
              { Authorization: "Bearer " + auth.token }
            );
          } catch (err) {
            console.log(err);
          }

          payShow.payToggler(false);
        } else if (extraPay) {
          try {
            await sendRequest(
              `${import.meta.env.VITE_SERVER_NAME}api/admin/user-paydue/${
                auth.userId
              }`
            );
            payShow.payToggler(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          pay.paidDets(due, true, "PAID");
          payShow.payToggler(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="px-4">
      <PaymentElement options={paymentElementOptions} />
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success btn-lg mt-2"
          onClick={handlePaySubmit}
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

CheckoutAppointment.propTypes = {
  due: PropTypes.number,
  lesson: PropTypes.string,
  courseName: PropTypes.string,
  duration: PropTypes.string,
  extraPay: PropTypes.bool,
};

import { useContext, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import PropTypes from "prop-types";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ due, appId, userId }) {
  const stripe = useStripe();
  const elements = useElements();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const paymentElementOptions = {
    layout: "tabs",
    paymentMethodOrder: ["card"],
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
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
          return_url: `${window.location.origin}/${userId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("here");
        try {
          const formData = new FormData();
          formData.append("amount", parseInt(due));
          formData.append("alertText", "Payment Received");
          await sendRequest(
            `${
              import.meta.env.VITE_SERVER_NAME
            }api/dashboard/appointment/payment/${appId}`,
            "PATCH",
            formData,
            { Authorization: "Bearer " + auth.token }
          );

          navigate("/");
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <PaymentElement options={paymentElementOptions} />
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success btn-lg mt-2"
          type="submit"
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

CheckoutForm.propTypes = {
  due: PropTypes.string,
  appId: PropTypes.string,
  userId: PropTypes.string,
};

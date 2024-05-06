import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { Button, Modal } from "reactstrap";
import PropTypes from "prop-types";
import { PaymentModalContext } from "../../context/payment-context";
import { AuthContext } from "../../../shared/context/auth-context";
import CheckoutAppointment from "../../form-elements/CheckoutAppointment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function AppointmentPay({ userData, amount }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");

  const pay = useContext(PaymentModalContext);
  console.log(pay);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();

        formData.append("amount", parseInt(amount) * 100);
        formData.append("name", userData?.fname + " " + userData?.lname);
        formData.append("email", userData?.email);
        await fetch(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/create-customer-intent`,
          {
            method: "POST",
            headers: { Authorization: "Bearer " + auth.token },
            body: formData,
          }
        ).then(async (r) => {
          const { clientSecret } = await r.json();
          setClientSecret(clientSecret);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [amount, auth, userData]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <FadeLoader
          cssOverride={{
            height: "100%",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: "2000",
          }}
          color="#f43e18"
        />
      )}
      {
        <Modal
          isOpen={pay.payNow}
          toggle={() => {
            pay.payToggler(false);
          }}
          size="lg"
          // style="display: none"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="payLabel">
                Confirm Payment
              </h5>
              <Button
                type="button"
                className="btn-close"
                onClick={() => {
                  pay.payToggler(false);
                }}
              ></Button>
            </div>
            <div className="modal-body">
              <div className="container">
                {clientSecret && userData && (
                  <>
                    <div className="form-floating mt-10">
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <CheckoutAppointment
                          due={amount}
                          userId={auth.userId}
                        />
                      </Elements>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  pay.payToggler(false);
                }}
                className="btn btn-light"
              >
                Close
              </button>
            </div>
          </div>
          {/* <!-- /.modal-content --> */}
          {/* <!-- /.modal-dialog --> */}
        </Modal>
      }
    </>
  );
}

AppointmentPay.propTypes = {
  userData: PropTypes.object,
  amount: PropTypes.string,
};

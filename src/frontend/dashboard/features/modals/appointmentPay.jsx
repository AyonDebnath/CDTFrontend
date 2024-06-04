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
import React from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function AppointmentPay({
  userData,
  amount,
  warning,
  lesson,
  courseName,
  duration,
  val,
  extraPay,
}) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [checked, setChecked] = useState(false);
  const [visi, setVisi] = useState(false);
  const auth = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");

  const pay = useContext(PaymentModalContext);
  const warnings = Object.entries(warning);

  useEffect(() => {
    setChecked(false);
    setVisi(false);
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
          size="lg"
          // style="display: none"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="payLabel">
                Confirm Payment
              </h5>
              {extraPay || (
                <Button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    pay.payToggler(false);
                  }}
                ></Button>
              )}
            </div>
            <div className="modal-body">
              <div className="container">
                {clientSecret && userData && warnings && (
                  <>
                    <div className={`mt-5 ${visi ? "destroy" : ""}`}>
                      {warnings.map((elem) => {
                        return (
                          <React.Fragment key={warnings.indexOf(elem)}>
                            <div className="mt-2 text-center fs-18">
                              {elem[1]}
                            </div>
                          </React.Fragment>
                        );
                      })}
                      <div
                        className={` ${
                          val
                            ? "destroy"
                            : "d-flex flex-column align-items-center"
                        }`}
                      >
                        <div className="form-check form-check-success mt-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="formCheck8"
                            onChange={() => {
                              setChecked(!checked);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formCheck8"
                          >
                            I have read, understood and agree to comply with all
                            the instruction lined out above
                          </label>
                        </div>
                        <div>
                          <button
                            className="btn btn-lg btn-warning mt-2"
                            disabled={!checked}
                            onClick={() => {
                              setVisi(!visi);
                            }}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`form-floating mt-10 ${visi ? "" : "destroy"}`}
                    >
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                        key={clientSecret}
                      >
                        <CheckoutAppointment
                          due={parseInt(amount)}
                          lesson={lesson}
                          courseName={courseName}
                          duration={duration}
                          extraPay={extraPay}
                        />
                      </Elements>
                    </div>
                  </>
                )}
              </div>
            </div>
            {extraPay || (
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
            )}
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
  warning: PropTypes.object,
  lesson: PropTypes.string,
  courseName: PropTypes.string,
  duration: PropTypes.string,
  val: PropTypes.bool,
  extraPay: PropTypes.bool,
};

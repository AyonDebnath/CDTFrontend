import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../form-elements/CheckoutForm";

import Selector from "../../../home/elements/form-elements/Selector";
import useForm from "../../../shared/hooks/form-hook";

import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { ShowContext } from "../../../shared/context/show-context";
import { FadeLoader } from "react-spinners";
import { Button, Modal } from "reactstrap";
import PropTypes from "prop-types";
import { SelectorContext } from "../../../shared/context/SelectorContext";
import { AuthContext } from "../../../shared/context/auth-context";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
export default function Payment({ userID, warning }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [useApp, setUseApp] = useState();
  const [app, setApp] = useState([]);
  const [appDets, setAppDets] = useState();
  const show = useContext(ShowContext);
  const [selectorVal, setSelectorVal] = useState();
  const auth = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const warnings = Object.entries(warning);

  const [visi, setVisi] = useState(false);
  const [checked, setChecked] = useState(false);
  async function valChange(val) {
    if (val !== "Invalid") {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/info/${val}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const responseData = await response.json();
        setAppDets(responseData.appointment);
        try {
          const formData = new FormData();

          formData.append(
            "amount",
            parseInt(responseData.appointment.due) * 100
          );
          formData.append("name", useApp.fname + " " + useApp.lname);
          formData.append("email", useApp.email);
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
            console.log(r);
            const { clientSecret } = await r.json();
            setClientSecret(clientSecret);
          });
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const [fomstate, inputHandler] = useForm(
    {
      Appointment: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/all/${userID}`
        );
        responseData.appointment && handlePayConfirm(responseData.appointment);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const fetchUserData = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        ).then(async (r) => {
          const user = await r.json();

          setUseApp(user.user);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();

    function handlePayConfirm(appointments) {
      let appDetails = [];
      appointments.forEach((elem) => {
        if (elem.paymentStatus === "UNPAID" && elem.status !== "EXPIRED") {
          appDetails.push({
            appId: elem.id,
            appName: elem.appName,
          });
        }
      });
      setApp(appDetails);
    }
  }, [userID, sendRequest, show]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }
  return (
    <SelectorContext.Provider value={{ val: selectorVal, setVal: valChange }}>
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
            isOpen={show.show}
            toggle={() => {
              show.showToggler(false);
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
                    show.showToggler(false);
                  }}
                ></Button>
              </div>
              <div className="modal-body">
                <div className="container">
                  {warnings && (
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
                        <div className="d-flex flex-column align-items-center">
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
                              I have read, understood and agree to comply with
                              all the instruction lined out above
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
                    </>
                  )}

                  <div className={`col-12 ${visi ? "" : "destroy"}`}>
                    <label className="visually-hidden" htmlFor="Appointment">
                      Appointment
                    </label>
                    <Selector
                      id="Appointment"
                      placeholder="Select the Appointment"
                      valueArray={app?.map((elem) => elem.appId)}
                      selectArray={app?.map((elem) => elem.appName)}
                      onInput={inputHandler}
                    />
                  </div>
                  {appDets && clientSecret && useApp && (
                    <>
                      <div className="table-responsive">
                        <table className="table align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Date</td>
                              <td className="text-success">
                                <i className="ri-calendar-check-line fs-17 align-middle"></i>
                                {appDets.date}
                              </td>
                            </tr>
                            <tr>
                              <td>Start Time</td>
                              <td className="text-success">
                                <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                                {appDets.startTime}
                              </td>
                            </tr>
                            <tr>
                              <td>End Time</td>
                              <td className="text-success">
                                <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                                {appDets.endTime}
                              </td>
                            </tr>
                            <tr>
                              <td>Pick Up</td>
                              <td className="text-success">
                                <i className="ri-map-pin-user-line fs-17 align-middle"></i>
                                {appDets.address}
                              </td>
                            </tr>
                            <tr>
                              <td>Expected Duration</td>
                              <td className="text-success">
                                <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                                {appDets.duration}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <!-- end table --> */}
                      </div>
                      <div className="form-floating mt-10">
                        <Elements
                          stripe={stripePromise}
                          options={{ clientSecret }}
                        >
                          <CheckoutForm
                            due={appDets.due}
                            appId={appDets.id}
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
                    show.showToggler(false);
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
    </SelectorContext.Provider>
  );
}

Payment.propTypes = {
  userID: PropTypes.string,
  warning: PropTypes.object,
};

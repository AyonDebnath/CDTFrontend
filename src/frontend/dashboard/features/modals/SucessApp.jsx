import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../form-elements/CheckoutForm";

import Selector from "../../../home/elements/form-elements/Selector";
import useForm from "../../../shared/hooks/form-hook";

import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { ShowContext } from "../../../shared/context/show-context";
import { FadeLoader } from "react-spinners";
import { Button, Modal } from "reactstrap";
import PropTypes from "prop-types";
import { SelectorContext } from "../../../shared/context/SelectorContext";
import { AuthContext } from "../../../shared/context/auth-context";
import { ConfirmContext } from "../../context/confirm-context";
import { useNavigate } from "react-router-dom";

export default function SucessApp({ userID, appDet }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [app, setApp] = useState([]);
  const [appDets, setAppDets] = useState();
  const confirm = useContext(ConfirmContext);
  const [selectorVal, setSelectorVal] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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
    let appDetails = [];
    if (appDet) {
      appDet.forEach((elem) => {
        if (
          elem.paymentStatus === "PAID" &&
          elem.status !== "EXPIRED" &&
          elem.status !== "USER CONFIRMED"
        ) {
          appDetails.push({
            appId: elem.id,
            appName: elem.appName,
          });
        }
      });
      setApp(appDetails);
    }
  }, [appDet]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  const handleConfirm = async (appID) => {
    try {
      await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/dashboard/appointment/status/${appID}`,
        "PATCH",

        JSON.stringify({
          status: "USER CONFIRMED",
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      navigate(`/user-appointment-history/${auth.userId}`);
    } catch (err) {
      console.log(err);
    }
  };

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
            isOpen={confirm.show}
            toggle={() => {
              confirm.showToggler(false);
            }}
            // style="display: none"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="payLabel">
                  Confirm Appointment
                </h5>
                <Button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    confirm.showToggler(false);
                  }}
                ></Button>
              </div>

              <div className="container">
                <div className="col-12">
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
                {appDets && (
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
                    <div className="d-grid gap-2 mt-20 mb-20">
                      <button
                        onClick={() => {
                          handleConfirm(appDets.id);
                        }}
                        type="button"
                        className="btn btn-success btn-label waves-effect waves-light rounded-pill"
                      >
                        <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        I am here
                      </button>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#reModal"
                        type="button"
                        className="btn btn-danger btn-label waves-effect waves-light rounded-pill"
                      >
                        <i className="ri-file-warning-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        I can't be there
                      </button>
                    </div>
                    {/* <!-- /.modal-content --> */}
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  confirm.showToggler(false);
                }}
                className="btn btn-light"
              >
                Close
              </button>
            </div>
            {/* <!-- /.modal-content --> */}
            {/* <!-- /.modal-dialog --> */}
          </Modal>
        }
      </>
    </SelectorContext.Provider>
  );
}

SucessApp.propTypes = {
  userID: PropTypes.string,
  appDet: PropTypes.array,
};

import PageTitle from "../features/user-body/PageTitle";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalFooter } from "reactstrap";

import ErrorModal from "../../shared/elements/ErrorModal";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../shared/context/auth-context";
import { ShowContext } from "../../shared/context/show-context";
import Payment from "../features/modals/Payment";

export default function AppointmentHistory() {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
  const userID = useParams().uid;
  const auth = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [modalApp, setModalApp] = useState();

  const show = useContext(ShowContext);

  const toggle = () => {
    setModal(!modal);
  };

  const warnings = {
    war1: (
      <p>
        You're paying for an <strong>Appointment</strong>
      </p>
    ),
    war2: (
      <p>
        The refund deadline is <strong>24hour</strong> before the appointment
      </p>
    ),
    war3: (
      <p>
        Please Check the details again before making <strong>Payment</strong> to
        avoid any issues.
      </p>
    ),
    war4: (
      <p>
        If you are making the payment <strong>24 Hour</strong> before the
        appointment there won't be an option to refund.
      </p>
    ),
    war5: (
      <p className="text-danger">DO NOT PAY TWICE UNDER ANY CIRCUMSTANCES.</p>
    ),
    war6: (
      <p className="text-danger">
        DO NOT GO OUT OF THIS MODAL WHILE PROCESSING
      </p>
    ),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/all/${userID}`
        );

        setAppData(responseData.appointment);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userID, sendRequest]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  function handleStatus(stat) {
    if (stat === "PENDING") {
      return "bg-danger";
    } else if (stat === "ADMIN APPROVED") {
      return "bg-warning";
    } else if (stat === "EXPIRED") {
      return "bg-dark";
    } else {
      return "bg-success";
    }
  }

  const handleDelete = async (appID) => {
    try {
      await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/dashboard/appointment/delete/${appID}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

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
      {!isLoading && appData && (
        <>
          {" "}
          <PageTitle pageName="Appointment History" />
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Your Appointment History</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-striped table-hover">
                    <table className="table table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                          <th scope="col"> Next Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appData?.map((elem) => {
                          return (
                            <tr key={elem.id}>
                              <td>
                                <a className="fw-semibold">#{elem.id}</a>
                              </td>
                              <td>{elem.name}</td>
                              <td>{elem.date}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    elem.status === "USER APPROVED"
                                      ? "bg-success"
                                      : `${handleStatus(elem.status)}`
                                  }`}
                                >
                                  {elem.status}
                                </span>
                              </td>
                              <td>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-5">
                                      {" "}
                                      <button
                                        disabled={elem.status === "EXPIRED"}
                                        onClick={() => {
                                          setModalApp(elem);
                                          toggle();
                                        }}
                                        type="button"
                                        className="btn btn-sm btn-success"
                                      >
                                        View Appointment
                                      </button>
                                    </div>
                                    <div className="col-2"></div>
                                    <div className="col-5">
                                      <button
                                        disabled={
                                          elem.status ===
                                            "PAID AND CONFIRMED" ||
                                          elem.paymentStatus === "PAID" ||
                                          elem.status === "USER CONFIRMED"
                                        }
                                        onClick={() => {
                                          handleDelete(elem.id);
                                        }}
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {" "}
                                {elem.status === "ADMIN CONFIRMED" ? (
                                  <button
                                    onClick={() => {
                                      show.showToggler(true);
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                  >
                                    Pay
                                  </button>
                                ) : (
                                  <button
                                    disabled={
                                      elem.status === "USER CONFIRMED" ||
                                      elem.status === "PENDING" ||
                                      elem.status === "EXPIRED"
                                    }
                                    onClick={() => {
                                      handleConfirm(elem.id);
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-warning"
                                  >
                                    Confirm
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <div className="modal-header">
              <h5 className="modal-title" id="appointmentLabel">
                Appointment Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggle}
              ></button>
            </div>
            <div className="modal-body">
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
                        {modalApp?.date}
                      </td>
                    </tr>
                    <tr>
                      <td>Start Time</td>
                      <td className="text-success">
                        <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                        {modalApp?.startTime}
                      </td>
                    </tr>
                    <tr>
                      <td>End Time</td>
                      <td className="text-success">
                        <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                        {modalApp?.endTime}
                      </td>
                    </tr>
                    <tr>
                      <td>Pick Up</td>
                      <td className="text-success">
                        <i className="ri-map-pin-user-line fs-17 align-middle"></i>
                        {modalApp?.address}
                      </td>
                    </tr>
                    <tr>
                      <td>Expected Duration</td>
                      <td className="text-success">
                        <i className="ri-timer-2-line fs-17 align-middle"></i>
                        {modalApp?.duration}
                      </td>
                    </tr>
                    <tr>
                      <td>Appointment Status</td>
                      <td
                        className={`badge ${
                          modalApp?.status === "USER APPROVED"
                            ? "bg-success"
                            : `${handleStatus(modalApp?.status)}`
                        } text-white mt-2`}
                      >
                        {modalApp?.status}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment Confirmation</td>
                      <td className="text-danger">
                        {modalApp?.paymentStatus === "UNPAID" ? (
                          <button
                            disabled={modalApp.status === "PENDING"}
                            type="button"
                            className="btn btn-danger btn-label waves-effect waves-light rounded-pill"
                          >
                            <i className="ri-file-warning-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                            {modalApp?.paymentStatus}
                          </button>
                        ) : (
                          <Link
                            to={`/user-payment-history/${modalApp?.userId}`}
                          >
                            <button
                              type="button"
                              className="btn btn-success btn-label waves-effect waves-light rounded-pill"
                            >
                              <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                              {modalApp?.paymentStatus}
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- end table --> */}
              </div>
              {/* <!-- end table responsive --> */}
            </div>
            <ModalFooter>
              <button type="button" className="btn btn-light" onClick={toggle}>
                Close
              </button>
            </ModalFooter>
          </Modal>
          <Payment warning={warnings} />
        </>
      )}
    </>
  );
}

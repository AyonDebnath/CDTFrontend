import PageTitle from "../user-body/PageTitle";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalFooter } from "reactstrap";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function PaymentDetails() {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
  const userID = useParams().uid;
  const [modal, setModal] = useState(false);
  const [modalApp, setModalApp] = useState();

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/all/${userID}`
        );

        setAppData(
          responseData.appointment?.filter((elem) => elem.status != "PENDING")
        );
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
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card">
              <div className="card-header">
                <h4>Your Payment History</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card">
                  <div className="table-responsive table-striped table-hover">
                    <table className="table align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Purchased</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appData.map((elem) => {
                          return (
                            <tr key={elem.id}>
                              <td>
                                <a className="fw-semibold">{elem.id}</a>
                              </td>
                              <td>{elem.date}</td>
                              <td
                                className={`${
                                  elem.paymentStatus === "PAID"
                                    ? "text-success"
                                    : "text-danger"
                                } `}
                              >
                                <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                                {elem.paymentStatus}
                              </td>
                              <td>{elem.name}</td>
                              <td>{elem.courseName}</td>
                              <td>
                                {elem.paymentStatus === "PAID"
                                  ? elem.amountPaid
                                  : 0}
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    setModalApp(elem);
                                    toggle();
                                  }}
                                  type="button"
                                  className="btn btn-sm btn-success"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="table-light">
                        <tr>
                          <td colSpan="6">Total</td>
                          <td>$425.00</td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* <!-- end table --> */}
                  </div>
                  {/* <!-- end table responsive --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="appointmentLabel">
            Appointment Details
          </h5>
          <button type="button" className="btn-close" onClick={toggle}></button>
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
                  <td>Payment Confirmation</td>
                  <td className="text-danger">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#payModal"
                      type="button"
                      className="btn btn-danger btn-label waves-effect waves-light rounded-pill"
                    >
                      <i className="ri-file-warning-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                      {modalApp?.paymentStatus}
                    </button>
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
    </>
  );
}

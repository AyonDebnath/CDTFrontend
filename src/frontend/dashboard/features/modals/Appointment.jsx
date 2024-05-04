import { Modal } from "reactstrap";
import { useContext } from "react";
import Link from "antd/es/typography/Link";
import { InfoModalContext } from "../../context/infoModal-context";

import PropTypes from "prop-types";

export default function Appointment({ appData }) {
  const info = useContext(InfoModalContext);

  const toggle = () => {
    info.showToggler(false, {});
  };

  return (
    <Modal isOpen={info.show} toggle={toggle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
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
                      {appData?.date}
                    </td>
                  </tr>
                  <tr>
                    <td>Start Time</td>
                    <td className="text-success">
                      <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                      {appData?.startTime}
                    </td>
                  </tr>
                  <tr>
                    <td>End Time</td>
                    <td className="text-success">
                      <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                      {appData?.endTime}
                    </td>
                  </tr>
                  <tr>
                    <td>Pick Up</td>
                    <td className="text-success">
                      <i className="ri-map-pin-user-line fs-17 align-middle"></i>
                      {appData?.address}
                    </td>
                  </tr>
                  <tr>
                    <td>Expected Duration</td>
                    <td className="text-success">
                      <i className="ri-timer-2-line fs-17 align-middle"></i>
                      {appData?.duration}
                    </td>
                  </tr>
                  <tr>
                    <td>Payment Confirmation</td>
                    <td className="text-danger">
                      {appData?.paymentStatus === "UNPAID" ? (
                        <button
                          disabled={appData?.status === "PENDING"}
                          type="button"
                          className="btn btn-danger btn-label waves-effect waves-light rounded-pill"
                        >
                          <i className="ri-file-warning-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                          {appData?.paymentStatus}
                        </button>
                      ) : (
                        <Link to={`/user-payment-history/${appData?.userId}`}>
                          <button
                            type="button"
                            className="btn btn-success btn-label waves-effect waves-light rounded-pill"
                          >
                            <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                            {appData?.paymentStatus}
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
          <div className="modal-footer">
            <button type="button" className="btn btn-light" onClick={toggle}>
              Close
            </button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </Modal>
  );
}

Appointment.propTypes = {
  appData: PropTypes.object,
};

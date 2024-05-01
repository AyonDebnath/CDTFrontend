export default function Appointment() {
  return (
    <div
      id="appointmentModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="appointmentLabel"
      aria-hidden="true"
      // style="display: none"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="appointmentLabel">
              Appointment Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
                      10 MAR, 2024
                    </td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td className="text-success">
                      <i className="ri-timer-2-line fs-17 align-middle"></i>{" "}
                      2:20 PM
                    </td>
                  </tr>
                  <tr>
                    <td>Pick Up</td>
                    <td className="text-success">
                      <i className="ri-map-pin-user-line fs-17 align-middle"></i>
                      20 Nascopie Crescent
                    </td>
                  </tr>
                  <tr>
                    <td>Expected Duration</td>
                    <td className="text-success">
                      <i className="ri-timer-2-line fs-17 align-middle"></i> 1
                      hour 30 mins
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
                        Unpaid
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <!-- end table --> */}
            </div>
            {/* <!-- end table responsive --> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

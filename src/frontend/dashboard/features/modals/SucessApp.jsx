export default function SuccessApp() {
  return (
    <div
      id="confirmModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="confirmLabel"
      aria-hidden="true"
      // style="display: none"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmLabel">
              Confirm Appointment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-grid gap-2">
              <button
                data-bs-toggle="modal"
                data-bs-target="#successAppModal"
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

export default function Reconsider() {
  return (
    <div
      id="reModal"
      className="modal flip"
      aria-labelledby="reLabel"
      aria-hidden="true"
      // style="display: none"
    >
      <div className="modal-dialog modal-dialog-centered modal-flip">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <div className="text-end">
              <button
                type="button"
                className="btn-close text-end"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="mt-2">
              <img
                className="fail-img"
                src="/frontend/img/confirm-cancel.png"
                alt="Confetti Image"
              />
              <h4 className="mb-3 mt-4 text-primary">Are you sure?</h4>
              <div className="d-grid gap-2">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#failModal"
                  className="btn btn-outline-warning"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#confirmModal"
                  className="btn btn-outline-danger"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  Reconsider
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-danger-subtle p-3 justify-content-center">
            <p className="mb-0 text-danger">
              We can't provide refunds for late cancellation. It is not too late
              to confirm
              <a
                data-bs-toggle="modal"
                type="btn"
                data-bs-target="#confirmModal"
                className="link-secondary fw-semibold reaffirm"
              >
                Confirm Appointment
              </a>
            </p>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

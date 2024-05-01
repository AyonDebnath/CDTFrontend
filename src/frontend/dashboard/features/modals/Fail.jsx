export default function Fail() {
  return (
    <div
      id="failModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="failLabel"
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
                src="/frontend/img/Fail.png"
                alt="Confetti Image"
              />
              <h4 className="mb-3 mt-4 text-primary">Appointment Cancelled</h4>
            </div>
          </div>
          <div className="modal-footer bg-danger-subtle p-3 justify-content-center">
            <p className="mb-0 text-danger">
              We can't provide refunds for late cancellation.
            </p>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

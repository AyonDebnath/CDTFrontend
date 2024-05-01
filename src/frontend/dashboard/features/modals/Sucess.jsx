export default function Success() {
  return (
    <div
      id="successAppModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="successAppLabel"
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
                className="success-img"
                src="/frontend/img/Success.png"
                alt="Confetti Image"
              />
              <h4 className="mb-3 mt-4 text-success">
                Appointment Confirmed Successfully!
              </h4>
            </div>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

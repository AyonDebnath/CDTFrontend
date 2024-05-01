export default function SuccessPay() {
  return (
    <div
      id="successModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="successLabel"
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
                Request Submitted Successfully!
              </h4>
              <p className="text-muted fs-15 mb-4">
                Thank You!!! We will review the information and get back to you
                as soon as possible. We are grateful for your continuous
                confidence in us.
              </p>
            </div>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

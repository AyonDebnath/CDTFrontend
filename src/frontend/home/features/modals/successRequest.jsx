import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default function SuccessRequest(props) {
  return (
    <Modal
      show={props.isSuccess}
      className={`${props.isSuccess ? "" : "destroy"} modal modal-home fade`}
      id="successModal"
      aria-labelledby="successModalLabel"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container pb-30 pt-10">
              <div className="row">
                {/* <!-- Contact Form --> */}
                <div className="col-lg-2"></div>
                <div className="contact-form form text-left col-lg-9 col-sm-12">
                  <img
                    src="/frontend/img/Success.png"
                    className="success-modal-img"
                    alt="success"
                  />
                  <h4 className="text-success text-center">
                    Request Submitted Successfully
                  </h4>
                  <p className="text-muted">
                    Thank you for your request, one of our admins will review
                    your request and get back to you as soon as possible.
                  </p>
                  <p className="text-muted">
                    Please check your email for your appointment details
                  </p>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-lg close-btn2"
              onClick={props.onClear}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

SuccessRequest.propTypes = {
  isSuccess: PropTypes.bool,
  onClear: PropTypes.func,
};

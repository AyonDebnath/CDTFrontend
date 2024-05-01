import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

export default function ErrorModal(props) {
  return (
    <Modal
      show={!!props.error}
      size="sm"
      className={`${props.error ? "" : "destroy"}`}
      centered
    >
      <Modal.Dialog className="err-modal-container">
        <Modal.Title>
          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>⚠️</h2>
        </Modal.Title>
        <Modal.Body>
          <h4 className="err-modal-title err-txt">{props.error}</h4>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button btn-sm"
            className="btn btn-light"
            onClick={props.onClear}
          >
            Close
          </button>
        </Modal.Footer>
        {/* <!-- /.modal-content --> */}
      </Modal.Dialog>
      {/* <!-- /.modal-dialog --> */}
    </Modal>
  );
}

ErrorModal.propTypes = {
  error: PropTypes.string,
  onClear: PropTypes.func,
};

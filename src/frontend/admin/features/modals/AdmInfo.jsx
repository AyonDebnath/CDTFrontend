import { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import PropTypes from "prop-types";
import { AdminInfoContext } from "../../context/admin-info-context";

export default function AdminInfoModal({ curAdmin }) {
  const info = useContext(AdminInfoContext);

  const toggle = () => {
    info.showToggler(false);
  };

  return (
    <Modal isOpen={info.show} toggle={toggle}>
      <ModalHeader toggle={toggle}>Admin Detail</ModalHeader>
      <ModalBody>
        {curAdmin && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img src={`${curAdmin.imageURL}`} className="user-info-image" />
              </div>
              <div className="col-1"></div>
              <div className="col-10">
                <table className="table table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td style={{ textAlign: "center" }}>{curAdmin.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td style={{ textAlign: "center" }}>{curAdmin.email}</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td style={{ textAlign: "center" }}>{curAdmin.number}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td style={{ textAlign: "center" }}>{curAdmin.role}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="btn rounded-pill btn-danger waves-effect waves-light"
          onClick={toggle}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}

AdminInfoModal.propTypes = {
  curAdmin: PropTypes.object,
};

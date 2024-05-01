import { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import PropTypes from "prop-types";
import { AppInfoContext } from "../../context/app-info-context";

export default function AppInfoModal({ curApp }) {
  const info = useContext(AppInfoContext);

  const toggle = () => {
    info.showToggler(false);
  };

  return (
    <Modal isOpen={info.show} toggle={toggle}>
      <ModalHeader toggle={toggle}>Appointment Detail</ModalHeader>
      <ModalBody>
        {curApp && (
          <div className="container">
            <div className="row">
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
                      <td>User Name</td>
                      <td style={{ textAlign: "center" }}>{curApp.name}</td>
                    </tr>
                    <tr>
                      <td>User Email</td>
                      <td style={{ textAlign: "center" }}>{curApp.email}</td>
                    </tr>
                    <tr>
                      <td> User Number</td>
                      <td style={{ textAlign: "center" }}>{curApp.number}</td>
                    </tr>
                    <tr>
                      <td>Appointment Date</td>
                      <td style={{ textAlign: "center" }}>{curApp.date}</td>
                    </tr>
                    <tr>
                      <td>Appointment Start Time</td>
                      <td style={{ textAlign: "center" }}>
                        {curApp.startTime}
                      </td>
                    </tr>
                    <tr>
                      <td>Appointment End Time</td>
                      <td style={{ textAlign: "center" }}>{curApp.endTime}</td>
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

AppInfoModal.propTypes = {
  curApp: PropTypes.object,
};

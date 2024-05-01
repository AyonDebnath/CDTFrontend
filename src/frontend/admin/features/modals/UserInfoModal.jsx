import { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { InfoContext } from "../../context/info-context";

import PropTypes from "prop-types";

export default function UserInfoModal({ curUser }) {
  const info = useContext(InfoContext);

  const toggle = () => {
    info.showToggler(false);
  };

  function handleStatus(stat) {
    if (stat === "PENDING") {
      return "bg-danger";
    } else if (stat === "ADMIN APPROVED") {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  }

  return (
    <Modal isOpen={info.show} toggle={toggle}>
      <ModalHeader toggle={toggle}>User Detail</ModalHeader>
      <ModalBody>
        {curUser && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  src={`${import.meta.env.VITE_SERVER_NAME}${curUser.image}`}
                  className="user-info-image"
                />
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
                      <td style={{ textAlign: "center" }}>
                        {curUser.fname} {curUser.lname}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td style={{ textAlign: "center" }}>{curUser.email}</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td style={{ textAlign: "center" }}>{curUser.number}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td style={{ textAlign: "center" }}>{curUser.address}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td style={{ textAlign: "center" }}>{curUser.gender}</td>
                    </tr>
                    <tr>
                      <td>status</td>
                      <td
                        style={{ textAlign: "center" }}
                        className={`badge  d-flex justify-content-center ${
                          curUser?.status === "USER APPROVED"
                            ? "bg-success"
                            : `${handleStatus(curUser?.status)}`
                        } text-white mt-2`}
                      >
                        {curUser.status}
                      </td>
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

UserInfoModal.propTypes = {
  curUser: PropTypes.object,
};

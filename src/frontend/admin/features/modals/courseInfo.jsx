import { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import PropTypes from "prop-types";
import { CourseInfoContext } from "../../context/course-info-context";

export default function CourseInfoModal({ curCourse }) {
  const info = useContext(CourseInfoContext);

  const toggle = () => {
    info.showToggler(false);
  };

  return (
    <Modal isOpen={info.show} toggle={toggle}>
      <ModalHeader toggle={toggle}>Course Detail</ModalHeader>
      <ModalBody>
        {curCourse && (
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
                      <td>Course Name</td>
                      <td style={{ textAlign: "center" }}>{curCourse.name}</td>
                    </tr>
                    <tr>
                      <td>Course Price</td>
                      <td style={{ textAlign: "center" }}>
                        ${curCourse.price}
                      </td>
                    </tr>
                    <tr>
                      <td> Number of Lessons</td>
                      <td style={{ textAlign: "center" }}>
                        {curCourse.number}
                      </td>
                    </tr>
                    <tr>
                      <td> Duration of Lessons</td>
                      <td style={{ textAlign: "center" }}>
                        {curCourse.duration}
                      </td>
                    </tr>
                    {curCourse.featureArray.map((elem) => {
                      return (
                        <tr key={curCourse.featureArray.indexOf(elem)}>
                          <td>features</td>
                          <td
                            style={{ textAlign: "center", color: "white" }}
                            className="badge bg-success mt-2"
                          >
                            {elem}
                          </td>
                        </tr>
                      );
                    })}
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

CourseInfoModal.propTypes = {
  curCourse: PropTypes.object,
};

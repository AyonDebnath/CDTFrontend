import PropTypes from "prop-types";
import Input from "../../../home/elements/form-elements/input";

import useForm from "../../../shared/hooks/form-hook";

import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";

import { DelContext } from "../../context/delete-context";
import { VALIDATOR_REQUIRE } from "../../../../../public/frontend/validators";
import { FaTrash } from "react-icons/fa";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";
import { UserCourseContext } from "../../context/user-course-context";

export default function CourseModal({ curUser }) {
  const course = useContext(UserCourseContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [courseData, setCourseData] = useState();
  const navigate = useNavigate();
  const aID = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/course/info/all`
        );
        setCourseData(responseData.course);
        console.log(responseData.course);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [sendRequest]);

  const toggle = () => {
    course.showToggler(!course.show);
  };

  const addSuggestedCourse = async (courseName) => {
    try {
      const formData = new FormData();
      formData.append("courseName", courseName);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/userCourse/add/${
          curUser.id
        }`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );

      navigate(`/admin/${aID}`);
    } catch (err) {
      console.log(err);
    }
  };

  const removeCourse = async (courseId) => {
    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/userCourse/remove/${
          curUser.id
        }`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );

      navigate(`/admin/${aID}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={course.show} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Assign course to User</ModalHeader>
      <ModalBody>
        {courseData && (
          <div className="container">
            <div className="d-flex justify-content-center">
              {courseData.map((elem) => {
                return (
                  <div className="container" key={elem.id}>
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-10">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th scope="col" style={{ textAlign: "center" }}>
                                Name
                              </th>
                              <th scope="col" style={{ textAlign: "center" }}>
                                Lessons
                              </th>
                              <th scope="col" style={{ textAlign: "center" }}>
                                Price
                              </th>
                              <th scope="col" style={{ textAlign: "center" }}>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                {elem.name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {elem.number}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                ${elem.price}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {curUser?.suggestedCourse == elem.name ? (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      removeCourse(elem.id);
                                    }}
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-success"
                                    onClick={() => {
                                      addSuggestedCourse(elem.name);
                                    }}
                                  >
                                    Add as Suggested
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                );
              })}
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

CourseModal.propTypes = {
  curUser: PropTypes.object,
};

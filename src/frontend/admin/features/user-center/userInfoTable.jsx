import ErrorModal from "../../../shared/elements/ErrorModal";

import { IoIosCheckmarkCircle, IoIosEye } from "react-icons/io";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { MdCancel, MdDeleteForever, MdPlayLesson } from "react-icons/md";

import { PropTypes } from "prop-types";
import { FadeLoader } from "react-spinners";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useContext, useState } from "react";
import UserInfoModal from "../modals/UserInfoModal";

import { InfoContext } from "../../context/info-context";
import { DelContext } from "../../context/delete-context";
import { UserEditContext } from "../../context/user-edit-context";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserCourseContext } from "../../context/user-course-context";
import CourseModal from "../modals/userCourse";

export default function UserInfoTable({ userDat }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState(userDat);
  const [curUser, setCurUser] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const adminAuth = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const toggle = () => {
    setPayModal(!payModal);
  };

  const showToggler = (val) => {
    setModalOpen(val);
  };

  const delToggler = (val) => {
    setDelModal(val);
  };

  const courseToggler = (val) => {
    setCourseModal(val);
  };

  const userToggler = (val) => {
    setUserModal(val);
  };

  const handleStatus = async (userID) => {
    const index = userData.findIndex((elem) => elem.id === userID);
    try {
      const responseData = await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/admin/user/updateStatus/${userID}`,
        "PATCH",
        JSON.stringify({
          status: "APPROVED",
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );
      userData[index] = responseData.user;
    } catch (err) {
      console.log(err);
    }
  };

  const payDue = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/user-paydue/${curUser.id}`
      );

      navigate(`/admin/${adminAuth.adminId}`);
    } catch (err) {
      console.log(err);
    }
  };

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <FadeLoader
          cssOverride={{
            height: "100%",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: "2000",
          }}
          color="#f43e18"
        />
      )}
      {!isLoading && userData && (
        <UserCourseContext.Provider
          value={{ show: courseModal, showToggler: courseToggler }}
        >
          <InfoContext.Provider
            value={{ show: modalOpen, showToggler: showToggler }}
          >
            <DelContext.Provider
              value={{ show: delModal, showToggler: delToggler }}
            >
              <UserEditContext.Provider
                value={{ show: userModal, showToggler: userToggler }}
              >
                <div className="table-responsive table-card mb-3">
                  <table
                    className="table align-middle table-nowrap mb-0"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="text-center">
                          User Name
                        </th>
                        <th scope="col" className="text-center">
                          Email
                        </th>
                        <th scope="col" className="text-center">
                          Number
                        </th>
                        <th scope="col" className="text-center">
                          Status
                        </th>
                        <th scope="col" style={{ textAlign: "Center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {userData.map((elem) => {
                        return (
                          <tr key={elem.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src={`${elem.imageURL}`}
                                    alt=""
                                    className="avatar-xxs rounded-circle image_src object-fit-cover"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-2 name text-center">
                                  {elem.fname} {elem.lname}
                                </div>
                              </div>
                            </td>
                            {elem.extraPay == 0 ? (
                              <>
                                <td className="owner text-center">
                                  {elem.email}
                                </td>
                                <td className="industry_type text-center">
                                  {elem.number}
                                </td>
                                <td className="d-flex justify-content-center ">
                                  <h5>
                                    <span
                                      className={`badge mt-2 ${
                                        elem.status === "APPROVED"
                                          ? "bg-success-subtle text-success"
                                          : "bg-danger-subtle text-danger"
                                      }`}
                                    >
                                      {elem.status}
                                    </span>
                                  </h5>
                                </td>
                                <td>
                                  {elem.status === "APPROVED" ? (
                                    <ul className="d-flex justify-content-around mt-2">
                                      <span className="badge bg-success-subtle action-btn">
                                        <IoIosEye
                                          className="text-success"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            showToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                      <span className="badge bg-warning-subtle action-btn">
                                        <FaEdit
                                          className="text-warning"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            userToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                      <span className="badge bg-success-subtle action-btn">
                                        <MdPlayLesson
                                          className="text-success"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            courseToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                      <span className="badge bg-danger-subtle action-btn">
                                        <MdDeleteForever
                                          className="text-danger"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            delToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                    </ul>
                                  ) : (
                                    <ul className="d-flex justify-content-around mt-2">
                                      <span
                                        className="badge bg-success-subtle action-btn"
                                        onClick={() => {
                                          handleStatus(elem.id);
                                        }}
                                      >
                                        <IoIosCheckmarkCircle
                                          className="text-success"
                                          style={{ fontSize: "23px" }}
                                        />
                                      </span>
                                      <span className="badge bg-primary-subtle action-btn">
                                        <FaInfoCircle
                                          className="text-primary"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            showToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                      <span className="badge bg-danger-subtle action-btn">
                                        <MdCancel
                                          className="text-danger"
                                          style={{ fontSize: "23px" }}
                                          onClick={() => {
                                            delToggler(true);
                                            setCurUser(elem);
                                          }}
                                        />
                                      </span>
                                    </ul>
                                  )}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text-danger">Payment Due </td>
                                <td className="text-danger">{elem.extraPay}</td>
                                <td className="text-danger">
                                  From previous appointment
                                </td>
                                <td>
                                  <button
                                    className="btn btn-success action-btn"
                                    onClick={() => {
                                      toggle();
                                      setCurUser(elem);
                                    }}
                                  >
                                    Payment Received
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <EditModal curUser={curUser} />
                <UserInfoModal curUser={curUser} />
                <DeleteModal curUser={curUser} />
                <CourseModal curUser={curUser} />
              </UserEditContext.Provider>
            </DelContext.Provider>
          </InfoContext.Provider>
        </UserCourseContext.Provider>
      )}
      <Modal isOpen={payModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Receive Payment</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="text-center">
              <h4>
                You are about to confirm you received payment for{" "}
                {curUser?.fname}s overdue
              </h4>
              <h5>
                Please confirm you received the sum of $
                {Math.abs(curUser?.extraPay)}
              </h5>
              <button className="btn btn-sucess" onClick={payDue}>
                Received Payment
              </button>
            </div>
          </div>
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
    </>
  );
}

UserInfoTable.propTypes = {
  userDat: PropTypes.array,
};

import ErrorModal from "../../../shared/elements/ErrorModal";

import { IoIosCheckmarkCircle, IoIosEye } from "react-icons/io";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { MdCancel, MdDeleteForever } from "react-icons/md";

import { PropTypes } from "prop-types";
import { FadeLoader } from "react-spinners";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useContext, useState } from "react";

import { AppInfoContext } from "../../context/app-info-context";
import { AppDelContext } from "../../context/app-del-context";
import AppDelete from "../modals/AppDel";
import AppInfoModal from "../modals/AppInfo";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";

export default function AppointmentInfo({ appDat }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appData, setAppData] = useState(appDat);
  const [curApp, setCurApp] = useState();
  const [info, setInfo] = useState(false);
  const [del, setDel] = useState(false);

  const adminAuth = useContext(AdminAuthContext);

  const infoToggler = (val) => {
    setInfo(val);
  };

  const delToggler = (val) => {
    setDel(val);
  };

  //   const userToggler = (val) => {
  //     setUserModal(val);
  //   };

  const handleStatus = async (appID) => {
    const index = appData.findIndex((elem) => elem.id === appID);
    try {
      const responseData = await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/admin/appointment/updateStatus/${appID}`,
        "PATCH",
        JSON.stringify({
          status: "ADMIN CONFIRMED",
          alertText: "Appointment Confirmed By Admin",
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminAuth.adminToken,
        }
      );
      appData[index] = responseData.appointment;
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
      {!isLoading && appData && (
        <AppInfoContext.Provider
          value={{ show: info, showToggler: infoToggler }}
        >
          <AppDelContext.Provider
            value={{ show: del, showToggler: delToggler }}
          >
            {/* <UserEditContext.Provider
              value={{ show: userModal, showToggler: userToggler }}
            > */}
            <div className="table-responsive table-card mb-3">
              <table
                className="table align-middle table-nowrap mb-0"
                id="customerTable"
              >
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Appointment Name
                    </th>
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Start Time
                    </th>
                    <th scope="col" className="text-center">
                      End Time
                    </th>
                    <th scope="col" style={{ textAlign: "Center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {appData.map((elem) => {
                    return (
                      <tr key={elem.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 ms-2 name text-center">
                              {elem.courseName}
                            </div>
                          </div>
                        </td>
                        <td className="owner text-center">{elem.startTime}</td>
                        <td className="industry_type text-center">
                          {elem.endTime}
                        </td>
                        <td className="d-flex justify-content-center ">
                          <h5>
                            <span
                              className={`badge mt-2 ${
                                elem.status === "ADMIN CONFIRMED"
                                  ? "bg-success-subtle text-success"
                                  : "bg-danger-subtle text-danger"
                              }`}
                            >
                              {elem.status}
                            </span>
                          </h5>
                        </td>
                        <td>
                          {elem.status === "ADMIN CONFIRMED" ? (
                            <ul className="d-flex justify-content-around mt-2">
                              <span className="badge bg-success-subtle action-btn">
                                <IoIosEye
                                  className="text-success"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    infoToggler(true);
                                    setCurApp(elem);
                                  }}
                                />
                              </span>
                              {/* <span className="badge bg-warning-subtle action-btn">
                                <FaEdit
                                  className="text-warning"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    userToggler(true);
                                    setCurUser(elem);
                                  }}
                                />
                              </span> */}
                              <span className="badge bg-danger-subtle action-btn">
                                <MdDeleteForever
                                  className="text-danger"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    delToggler(true);
                                    setCurApp(elem);
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
                                    infoToggler(true);
                                    setCurApp(elem);
                                  }}
                                />
                              </span>
                              <span className="badge bg-danger-subtle action-btn">
                                <MdCancel
                                  className="text-danger"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    delToggler(true);
                                    setCurApp(elem);
                                  }}
                                />
                              </span>
                            </ul>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <EditModal curUser={curUser} /> */}
            <AppInfoModal curApp={curApp} />
            <AppDelete curApp={curApp} />
            {/* </UserEditContext.Provider> */}
          </AppDelContext.Provider>
        </AppInfoContext.Provider>
      )}
    </>
  );
}

AppointmentInfo.propTypes = {
  appDat: PropTypes.array,
};

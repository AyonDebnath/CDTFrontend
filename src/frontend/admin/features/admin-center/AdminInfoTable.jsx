import PropTypes from "prop-types";

import { useState } from "react";

import { AdminDeleteContext } from "../../context/admin-delete-context";
import { AdminEditContext } from "../../context/admin-edit-context";
import { AdminInfoContext } from "../../context/admin-info-context";
import AdminDelete from "../modals/AdminDelete";
import { IoIosEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AdminInfoModal from "../modals/AdmInfo";
import AdminEditModal from "../modals/AdminEdit";

export default function AdminInfoTable({ adminData }) {
  const [edit, setEdit] = useState();
  const [del, setDel] = useState();
  const [info, setInfo] = useState();
  const [curAdmin, setCurAdmin] = useState();

  const editToggler = (val) => {
    setEdit(val);
  };

  const delToggler = (val) => {
    setDel(val);
  };

  const infoToggler = (val) => {
    setInfo(val);
  };

  return (
    <>
      {adminData && (
        <AdminInfoContext.Provider
          value={{ show: info, showToggler: infoToggler }}
        >
          <AdminDeleteContext.Provider
            value={{ show: del, showToggler: delToggler }}
          >
            <AdminEditContext.Provider
              value={{ show: edit, showToggler: editToggler }}
            >
              <div className="table-responsive table-card mb-3">
                <table
                  className="table align-middle table-nowrap mb-0"
                  id="customerTable"
                >
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="text-center">
                        Admin Name
                      </th>
                      <th scope="col" className="text-center">
                        Email
                      </th>
                      <th scope="col" className="text-center">
                        Number
                      </th>
                      <th scope="col" className="text-center">
                        Role
                      </th>
                      <th scope="col" style={{ textAlign: "Center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {adminData.map((elem) => {
                      return (
                        <tr key={elem.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <img
                                  src={`${import.meta.env.VITE_SERVER_NAME}${
                                    elem.image
                                  }`}
                                  alt=""
                                  className="avatar-xxs rounded-circle image_src object-fit-cover"
                                />
                              </div>
                              <div className="flex-grow-1 ms-2 name text-center">
                                {elem.fname} {elem.lname}
                              </div>
                            </div>
                          </td>
                          <td className="owner text-center">{elem.email}</td>
                          <td className="industry_type text-center">
                            {elem.number}
                          </td>
                          <td className="d-flex justify-content-center ">
                            <h5>
                              <span className="badge mt-2 bg-success-subtle text-success">
                                {elem.role}
                              </span>
                            </h5>
                          </td>
                          <td>
                            <ul className="d-flex justify-content-around mt-2">
                              <span className="badge bg-success-subtle action-btn">
                                <IoIosEye
                                  className="text-success"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    infoToggler(true);
                                    setCurAdmin(elem);
                                  }}
                                />
                              </span>
                              <span className="badge bg-warning-subtle action-btn">
                                <FaEdit
                                  className="text-warning"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    editToggler(true);
                                    setCurAdmin(elem);
                                  }}
                                />
                              </span>
                              <span className="badge bg-danger-subtle action-btn">
                                <MdDeleteForever
                                  className="text-danger"
                                  style={{ fontSize: "23px" }}
                                  onClick={() => {
                                    delToggler(true);
                                    setCurAdmin(elem);
                                  }}
                                />
                              </span>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <AdminEditModal curAdmin={curAdmin} />
              <AdminInfoModal curAdmin={curAdmin} />
              <AdminDelete curAdmin={curAdmin} />
            </AdminEditContext.Provider>
          </AdminDeleteContext.Provider>
        </AdminInfoContext.Provider>
      )}
    </>
  );
}

AdminInfoTable.propTypes = {
  adminData: PropTypes.array,
};

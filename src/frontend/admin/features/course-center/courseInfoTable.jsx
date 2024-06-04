import PropTypes from "prop-types";

import { useState } from "react";

import { CourseInfoContext } from "../../context/course-info-context";
import { IoIosEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CourseInfoModal from "../modals/courseInfo";
import { CourseDeleteContext } from "../../context/course-delete-context";
import CourseDelete from "../modals/courseDelete";
import { Link, useParams } from "react-router-dom";

export default function CourseInfoTable({ courseData }) {
  const [del, setDel] = useState();
  const [info, setInfo] = useState();
  const [curCourse, setCurCourse] = useState();
  const adminId = useParams().aid;

  const delToggler = (val) => {
    setDel(val);
  };

  const infoToggler = (val) => {
    setInfo(val);
  };

  return (
    <>
      {courseData && (
        <CourseInfoContext.Provider
          value={{ show: info, showToggler: infoToggler }}
        >
          <CourseDeleteContext.Provider
            value={{ show: del, showToggler: delToggler }}
          >
            <div className="table-responsive table-card mb-3">
              <table
                className="table align-middle table-nowrap mb-0"
                id="customerTable"
              >
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Course Name
                    </th>
                    <th scope="col" className="text-center">
                      Course Price
                    </th>
                    <th scope="col" className="text-center">
                      Lesson Number
                    </th>
                    <th scope="col" className="text-center">
                      Lesson Duration
                    </th>
                    <th scope="col" className="text-center">
                      Number of Features
                    </th>
                    <th scope="col" style={{ textAlign: "Center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {courseData.map((elem) => {
                    return (
                      <tr key={elem.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 ms-2 name text-center">
                              {elem.name}
                            </div>
                          </div>
                        </td>
                        <td className="owner text-center">${elem.price}</td>
                        <td className="industry_type text-center">
                          {elem.number}
                        </td>
                        <td className="industry_type text-center">
                          {elem.duration} hour
                        </td>
                        <td className="d-flex justify-content-center ">
                          <h5>
                            <span className="badge mt-2 bg-success-subtle text-success">
                              {elem.featureArray.length}
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
                                  setCurCourse(elem);
                                }}
                              />
                            </span>
                            <span className="badge bg-warning-subtle action-btn">
                              <Link
                                to={`/admin/edit-course/${adminId}/${elem.id}`}
                              >
                                <FaEdit
                                  className="text-warning"
                                  style={{ fontSize: "23px" }}
                                />
                              </Link>
                            </span>
                            <span className="badge bg-danger-subtle action-btn">
                              <MdDeleteForever
                                className="text-danger"
                                style={{ fontSize: "23px" }}
                                onClick={() => {
                                  delToggler(true);
                                  setCurCourse(elem);
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
            {/* <AdminEditModal curAdmin={curAdmin} /> */}
            <CourseInfoModal curCourse={curCourse} />
            <CourseDelete curCourse={curCourse} />
          </CourseDeleteContext.Provider>
        </CourseInfoContext.Provider>
      )}
    </>
  );
}

CourseInfoTable.propTypes = {
  courseData: PropTypes.array,
};

export default function CourseProgress() {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Course Progress</h4>
        </div>
        {/* <!-- end card header --> */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Lesson Status</th>
                  <th scope="col">Lesson Action</th>
                  <th scope="col">Admin Action</th>
                  <th scope="col">Trainer</th>
                  <th scope="col">Purchased</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Payment Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lesson1</td>
                  <td className="text-success">
                    <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                    Completed
                  </td>
                  <td>
                    <button className="btn-sm btn-outline-success btn" disabled>
                      Book Now
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-success">Confirmed</span>
                  </td>
                  <td>Thomas</td>
                  <td>Most Popular</td>
                  <td>$70</td>
                  <td className="text-success">
                    <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                    Paid
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#payModal"
                      className="btn-sm btn-outline-dark btn"
                      disabled
                    >
                      Pay Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Lesson2</td>
                  <td className="text-success">
                    <i className="ri-close-circle-line fs-17 align-middle"></i>{" "}
                    Booked
                  </td>
                  <td>
                    <button className="btn-sm btn-outline-success btn" disabled>
                      Book Now
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-warning">Unconfirmed</span>
                  </td>
                  <td>Thomas</td>
                  <td>Most Popular</td>
                  <td>$110</td>
                  <td className="text-danger">
                    <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                    Unpaid
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#payModal"
                      className="btn-sm btn-outline-danger btn"
                    >
                      Pay Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Lesson2</td>
                  <td className="text-warning">
                    <i className="ri-error-warning-line fs-17 align-middle"></i>{" "}
                    Unconfirmed
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmModal"
                      className="btn-sm btn-outline-warning btn"
                    >
                      Confirm
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-warning">Unconfirmed</span>
                  </td>
                  <td>Thomas</td>
                  <td>Most Popular</td>
                  <td>$110</td>
                  <td className="text-danger">
                    <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                    Unpaid
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#payModal"
                      className="btn-sm btn-outline-danger btn"
                    >
                      Pay Now
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Lesson3</td>
                  <td className="text-danger">
                    <i className="ri-close-circle-line fs-17 align-middle"></i>{" "}
                    Unbooked
                  </td>
                  <td>
                    <button className="btn-sm btn-outline-success btn" disabled>
                      Book Now
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-danger">N/A</span>
                  </td>
                  <td>Thomas</td>
                  <td>Most Popular</td>
                  <td>$140</td>
                  <td className="text-black">
                    <i className="ri-checkbox-circle-line fs-17 align-middle"></i>{" "}
                    Unpaid
                  </td>
                  <td>
                    <button className="btn-sm btn-outline-dark btn" disabled>
                      Pay Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- end table --> */}
          </div>
          {/* <!-- end table responsive --> */}
        </div>
        {/* <!-- end card-body --> */}
      </div>
      {/* <!-- end table responsive --> */}
    </div>
  );
}

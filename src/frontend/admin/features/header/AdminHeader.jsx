import { useContext, useEffect, useState } from "react";
import { WindowContext } from "../../../shared/context/window-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Link, useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";

export default function AdminHeader() {
  const wind = useContext(WindowContext);
  const auth = useContext(AdminAuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [adminData, setAdminData] = useState();
  const adminID = useParams().aid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/admin/info/${auth.adminId}`
        );

        setAdminData(responseData.admin);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [adminID, sendRequest, auth.adminId]);

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
      {!isLoading && adminData && (
        <header id={`${wind.navVisi ? "page-topbar" : "page-topbar-full"}`}>
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                  id="topnav-hamburger-icon"
                  onClick={wind.visiToggler}
                >
                  <span className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              </div>

              <div className="d-flex align-items-center">
                {/* <div
                  className="dropdown topbar-head-dropdown ms-1 header-item"
                  id="notificationDropdown"
                >
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                    id="page-header-notifications-dropdown"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-bell fs-22"></i>
                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                      3<span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-notifications-dropdown"
                  >
                    <div className="dropdown-head bg-primary bg-pattern rounded-top">
                      <div className="p-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <h6 className="m-0 fs-16 fw-semibold text-white">
                              Notifications
                            </h6>
                          </div>
                          <div className="col-auto dropdown-tabs">
                            <span className="badge bg-light text-body fs-13">
                              4 New
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 pt-2">
                        <ul
                          className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                          data-dropdown-tabs="true"
                          id="notificationItemsTab"
                          role="tablist"
                        >
                          <li className="nav-item waves-effect waves-light">
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="#all-noti-tab"
                              role="tab"
                              aria-selected="true"
                            >
                              All (4)
                            </a>
                          </li>
                          <li className="nav-item waves-effect waves-light">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#alerts-tab"
                              role="tab"
                              aria-selected="false"
                            >
                              Alerts
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className="tab-content position-relative"
                      id="notificationItemsTabContent"
                    >
                      <div
                        className="tab-pane fade show active py-2 ps-2"
                        id="all-noti-tab"
                        role="tabpanel"
                      >
                        <div
                          data-simplebar=""
                          //   style="max-height: 300px"
                          className="pe-2"
                        >
                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <div className="avatar-xs me-3 flex-shrink-0">
                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                  <i className="bx bx-badge-check"></i>
                                </span>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check01"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check01"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <img
                                src="/frontend/assets/images/users/avatar-2.jpg"
                                className="me-3 rounded-circle avatar-xs flex-shrink-0"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Angela Bernier
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Answered to your comment on the cash flow
                                    forecast graph 🔔.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 48
                                    min ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check02"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check02"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-reset notification-item d-block dropdown-item position-relative">
                            <div className="d-flex">
                              <div className="avatar-xs me-3 flex-shrink-0">
                                <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                  <i className="bx bx-message-square-dots"></i>
                                </span>
                              </div>
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-2 fs-13 lh-base">
                                    You have received
                                    <b className="text-success">20</b> new
                                    messages in the conversation
                                  </h6>
                                </a>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 2
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="all-notification-check03"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="all-notification-check03"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade py-2 ps-2"
                        id="messages-tab"
                        role="tabpanel"
                        aria-labelledby="messages-tab"
                      >
                        <div
                          data-simplebar=""
                          //   style="max-height: 300px"
                          className="pe-2"
                        >
                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-3.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    James Lemire
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    We talked about a project on linkedin.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 30
                                    min ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check01"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check01"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-2.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Angela Bernier
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Answered to your comment on the cash flow
                                    forecast graph 🔔.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 2
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check02"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check02"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-6.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Kenneth Brown
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    Mentionned you in his comment on 📃 invoice
                                    #12501.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 10
                                    hrs ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check03"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check03"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-reset notification-item d-block dropdown-item">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-8.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <a href="#!" className="stretched-link">
                                  <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                    Maureen Gibson
                                  </h6>
                                </a>
                                <div className="fs-13 text-muted">
                                  <p className="mb-1">
                                    We talked about a project on linkedin.
                                  </p>
                                </div>
                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                  <span>
                                    <i className="mdi mdi-clock-outline"></i> 3
                                    days ago
                                  </span>
                                </p>
                              </div>
                              <div className="px-2 fs-15">
                                <div className="form-check notification-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="messages-notification-check04"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="messages-notification-check04"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="my-3 text-center view-all">
                            <button
                              type="button"
                              className="btn btn-soft-success waves-effect waves-light"
                            >
                              View All Messages
                              <i className="ri-arrow-right-line align-middle"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade p-4"
                        id="alerts-tab"
                        role="tabpanel"
                        aria-labelledby="alerts-tab"
                      ></div>

                      <div
                        className="notification-actions"
                        id="notification-actions"
                      >
                        <div className="d-flex text-muted justify-content-center">
                          Select
                          <div
                            id="select-content"
                            className="text-body fw-semibold px-1"
                          >
                            0
                          </div>
                          Result
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 ms-3"
                            data-bs-toggle="modal"
                            data-bs-target="#removeNotificationModal"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button
                    type="button"
                    className="btn material-shadow-none"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <img
                        className="rounded-circle header-profile-user"
                        src={`${import.meta.env.VITE_SERVER_NAME}${
                          adminData.image
                        }`}
                        alt="Header Avatar"
                      />
                      <span className="text-start ms-xl-2">
                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                          {adminData.name}
                        </span>
                        <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                          {adminData.role}
                        </span>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* <!-- item--> */}
                    <h6 className="dropdown-header">
                      Welcome {adminData.name}!
                    </h6>
                    <Link
                      className="dropdown-item"
                      to={`/user-profile/${adminData.id}`}
                    >
                      <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Profile</span>
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={`/user-appointment/${adminData.id}`}
                    >
                      <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Schedule Appointment</span>
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={`/user-profile-settings/${adminData.id}`}
                    >
                      <i className="ri-user-settings-line text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Settings</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        return auth.adminLogout();
                      }}
                    >
                      <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle" data-key="t-logout">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}

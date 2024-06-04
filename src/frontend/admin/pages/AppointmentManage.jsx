import PageTitle from "../features/admin-body/pagetitle";
import ErrorModal from "../../shared/elements/ErrorModal";

import { FadeLoader } from "react-spinners";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState, useEffect, useContext, useCallback } from "react";
import AppointmentInfo from "../features/appointment-center/AppointmentInfo";
import { AdminAuthContext } from "../../shared/context/admin-auth-context";
import { useDate } from "../../shared/hooks/date-hook";

export default function AppManage() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appointmentData, setAppointmentData] = useState();
  const auth = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_SERVER_NAME}api/admin/appointment/all`
        ).then(async (r) => {
          const res = await r.json();
          setAppointmentData(res.appointment);
          res?.appointment?.length > 0 && handleAppointment(res.appointment);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    const handleAppointment = async (appInfo) => {
      for (const app of appInfo) {
        let curD = new Date();
        let today = curD.getDate();
        let curTime = curD.getHours() + 1;
        let dateArr = app.date.split("-");
        let appDay = dateArr[2];
        let appTime = getIntValue(app.startTime) + 2;
        if (parseInt(appDay) < today && app.status != "COMPLETED") {
          try {
            await fetch(
              `${
                import.meta.env.VITE_SERVER_NAME
              }api/admin/appointment/updateStatus/${app.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth.adminToken,
                },
                body: JSON.stringify({
                  status: "EXPIRED",
                  alertText: "Appointment Expired",
                }),
              }
            ).then(async (r) => {
              const res = await r.json();
            });
          } catch (err) {
            console.log(err);
          }
        } else if (
          parseInt(appDay) === today &&
          appTime < curTime &&
          app.status != "COMPLETED"
        ) {
          try {
            await fetch(
              `${
                import.meta.env.VITE_SERVER_NAME
              }api/admin/appointment/updateStatus/${app.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth.adminToken,
                },
                body: JSON.stringify({
                  status: "EXPIRED",
                  alertText: "Appointment Expired",
                }),
              }
            ).then(async (r) => {
              const res = await r.json();
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    const getIntValue = (timeVal) => {
      let timeArr = [];

      if (timeVal.length === 6) {
        timeArr.push(timeVal.slice(0, 4));
        timeArr.push(timeVal.slice(4, 6));
      } else {
        timeArr.push(timeVal.slice(0, 5));
        timeArr.push(timeVal.slice(5, 7));
      }

      let setHour;

      const timeIndi = timeArr[0].split(":");

      if (
        timeArr[1] === "AM" ||
        timeArr[0] === "12:00" ||
        timeArr[0] === "12:30"
      ) {
        if (timeIndi[1] === "30") {
          setHour = parseFloat(timeIndi[0]) + 0.5;
        } else {
          setHour = parseFloat(timeIndi[0]);
        }
      } else {
        if (timeIndi[1] === "30") {
          setHour = parseFloat(timeIndi[0]) + 12.5;
        } else {
          setHour = parseFloat(timeIndi[0]) + 12;
        }
      }

      return setHour;
    };
  }, [auth]);

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
      {!isLoading && appointmentData && (
        <>
          {" "}
          {/* <!-- start page title --> */}
          <PageTitle pageName="User Info" />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="flex-shrink-0">
                      <div className="hstack text-nowrap gap-2">
                        <button
                          className="btn btn-soft-danger material-shadow-none"
                          id="remove-actions"
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                        <button className="btn btn-danger material-shadow-none">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
            <div className="col-xxl-12">
              <div className="card" id="companyList">
                <div className="card-header">
                  <div className="row g-2">
                    <div className="col-md-3">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for user..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <AppointmentInfo appDat={appointmentData} />
                  </div>
                </div>
                {/* <!--end card--> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

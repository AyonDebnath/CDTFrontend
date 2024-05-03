/* eslint-disable react/no-unescaped-entities */

import PageTitle from "../features/user-body/PageTitle";
import ActionTile from "../features/user-body/ActionTile";
import InfoTile from "../features/user-body/InfoTile";
// import MessageBoard from "../features/user-body/MessageBoard";
import SuggestedCourse from "../features/user-body/SuggestedCourse";
import { useContext, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useDate } from "../../shared/hooks/date-hook";

import { AuthContext } from "../../shared/context/auth-context";

export default function Dashboard() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { getIntValue, getTimeValue } = useDate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/appointment/all/${
            auth.userId
          }`
        ).then(async (r) => {
          const res = await r.json();
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
        let appTime = getIntValue(app.startTime);
        if (parseInt(appDay) < today) {
          try {
            await fetch(
              `${
                import.meta.env.VITE_SERVER_NAME
              }api/dashboard/appointment/status/${app.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth.token,
                },
                body: JSON.stringify({
                  status: "EXPIRED",
                }),
              }
            ).then(async (r) => {
              const res = await r.json();
            });
          } catch (err) {
            console.log(err);
          }
        } else if (parseInt(appDay) === today && appTime < curTime) {
          try {
            await fetch(
              `${
                import.meta.env.VITE_SERVER_NAME
              }api/dashboard/appointment/status/${app.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth.token,
                },
                body: JSON.stringify({
                  status: "EXPIRED",
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
  }, [auth, getIntValue]);

  return (
    <>
      {/* <!-- start page title --> */}
      <PageTitle pageName="Dashboard" />
      {/* <!-- end page title --> */}
      <ActionTile />
      {/* <!-- end col --> */}

      <InfoTile />
      {/* <!-- end row --> */}

      <div className="row">
        {/* <MessageBoard /> */}
        {/* <!-- end col --> */}
        <SuggestedCourse />
        {/* <!-- end row --> */}
      </div>
      {/* <!-- container-fluid --> */}
    </>
  );
}

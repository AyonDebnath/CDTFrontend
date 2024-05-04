import AppointmentForm from "../features/appointment/AppointmentForm";
import PageTitle from "../features/user-body/PageTitle";

import ErrorModal from "../../shared/elements/ErrorModal";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { FadeLoader } from "react-spinners";

export default function AppointmentCenter() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
  const auth = useContext(AuthContext);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/appointment/all/${
            auth.userId
          }`
        );
        responseData.appointment?.length > 0
          ? handleAppData(responseData.appointment)
          : setShowApp(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const handleAppData = (appInfo) => {
      let count = 0;
      for (const app of appInfo) {
        if (app.status === "PENDING" || app.status === "ADMIN CONFIRMED") {
          count += 1;
        }

        if (count >= 2) {
          console.log("here");
          setShowApp(false);
        } else {
          setShowApp(true);
        }
      }
    };
  }, [sendRequest, auth]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && appData?.length > 0 && (
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
      {!isLoading && showApp ? (
        <>
          {" "}
          <PageTitle pageName="Appointment Center" />
          <AppointmentForm />
        </>
      ) : (
        <>
          {" "}
          <PageTitle pageName="Appointment Center" />
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Make an Appointment</h4>
                </div>
                <div className="card-body">
                  <h2 className="text-success text-center">
                    Limit Reached for Appointment Processing. Please wait for
                    appointments to be processed or make payments for the
                    already processed ones.
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </>
      )}
    </>
  );
}

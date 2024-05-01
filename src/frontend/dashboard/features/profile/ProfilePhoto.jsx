import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function ProfilePhoto() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const userID = useParams().uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );
        setUserData(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [sendRequest, userID]);

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
        <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
          <div className="row g-4">
            <div className="col-auto">
              <div className="avatar-lg">
                <img
                  src={`${import.meta.env.VITE_SERVER_NAME}${userData?.image}`}
                  alt="user-img"
                  className="img-thumbnail rounded-circle"
                />
              </div>
            </div>
            {/* <!--end col--> */}
            <div className="col">
              <div className="p-2">
                <h3 className="text-white mb-1">
                  {userData.fname} {userData.lname}
                </h3>
                <p className="text-white text-opacity-75">Student</p>
                <div className="hstack text-white-50 gap-1">
                  <div className="me-2">
                    <i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                    {userData.city} {userData.country}
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
      )}
    </>
  );
}

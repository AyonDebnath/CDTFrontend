import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function ProfileAbout() {
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
      {!isLoading && userData?.about && (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-3">About</h4>
            <p>{userData.about}</p>
            {/* <!--end row--> */}
          </div>
          {/* <!--end card-body--> */}
        </div>
      )}
    </>
  );
}

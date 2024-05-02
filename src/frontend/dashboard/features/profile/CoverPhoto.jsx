import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useEffect, useState } from "react";

export default function CoverPhoto() {
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
  }, [userID, sendRequest]);

  return (
    <div className="profile-foreground position-relative mx-n4 mt-n4">
      <div className="profile-wid-bg">
        <img
          src={`${userData?.coverImageURL}`}
          alt=""
          className="profile-wid-img"
        />
      </div>
    </div>
  );
}

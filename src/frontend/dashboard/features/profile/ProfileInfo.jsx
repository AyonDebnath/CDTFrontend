import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function ProfileInfo() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const [comp, setComp] = useState();
  const [createdAt, setCreatedAt] = useState();
  const userID = useParams().uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );
        setUserData(responseData.user);
        responseData.user && handleUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    function handleUser(userD) {
      setComp(7);

      if (userD.about) {
        setComp(comp + 1);
      } else if (userD.coverImage) {
        setComp(comp + 1);
      } else if (userD.city) {
        setComp(comp + 1);
      } else if (userD.zipcode) {
        setComp(comp + 1);
      } else if (userD.country) {
        setComp(comp + 1);
      }
      setComp((comp / 12) * 100);
      const create = userD.createdAt.slice(0, 10);

      setCreatedAt(create);
    }
    fetchData();
  }, [sendRequest, userID, comp]);

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
        <div className="col-xxl-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-5">Complete Your Profile</h5>
              <div className="progress animated-progress custom-progress progress-label">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${comp}%` }}
                  aria-valuenow={`${comp}`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div className="label">{comp}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Info</h5>
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="ps-0" scope="row">
                        Full Name :
                      </th>
                      <td className="text-muted">
                        {userData.fname} {userData.lname}
                      </td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Mobile :
                      </th>
                      <td className="text-muted">{userData.number}</td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        E-mail :
                      </th>
                      <td className="text-muted">{userData.email}</td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Location :
                      </th>
                      <td className="text-muted">{userData.address}</td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Joining Date :
                      </th>
                      <td className="text-muted">{createdAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- end card body --> */}
          </div>
          {/* <!-- end card --> */}
        </div>
      )}
    </>
  );
}

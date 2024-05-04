import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../shared/context/auth-context";
import Payment from "../modals/Payment";
import { ShowContext } from "../../../shared/context/show-context";
import { ConfirmContext } from "../../context/confirm-context";
import SucessApp from "../modals/SucessApp";

export default function ActionTile() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [confirmApp, setConfirmApp] = useState();
  const [tried, setTried] = useState();
  const [payApp, setPayApp] = useState();
  const userID = useParams().uid;
  const auth = useContext(AuthContext);
  const show = useContext(ShowContext);

  const [confirm, setConfirm] = useState(false);

  const confirmToggler = (val) => {
    setConfirm(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/all/${userID}`
        );
        setTried(responseData.appointment?.length);
        responseData.appointment && handlePayConfirm(responseData.appointment);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userID, sendRequest]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  function handlePayConfirm(appointments) {
    let payArr = [];

    appointments.forEach((elem) => {
      if (
        elem?.completed === "NO" &&
        elem?.status === "ADMIN CONFIRMED" &&
        elem?.paymentStatus === "UNPAID" &&
        elem?.status != "EXPIRED"
      ) {
        payArr.push(elem);
      }
    });

    let confirmArr = [];
    appointments.forEach((elem) => {
      if (
        elem?.completed === "NO" &&
        (elem?.status === "ADMIN CONFIRMED" ||
          elem?.status === "PAID AND CONFIRMED") &&
        elem?.status != "EXPIRED" &&
        elem?.paymentStatus === "PAID"
      ) {
        confirmArr.push(elem);
      }
    });
    setPayApp(payArr);
    setConfirmApp(confirmArr);
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
      {!isLoading && (
        <ConfirmContext.Provider
          value={{ show: confirm, showToggler: confirmToggler }}
        >
          <div className="row">
            <div className="row">
              <div className="col-xxl-4 col-lg-6">
                <div className="card card-body text-center card-primary">
                  <div className="avatar-sm mx-auto mb-3">
                    <div className="avatar-title bg-primary-subtle text-primary fs-17 rounded">
                      <i className="ri-calendar-schedule-fill"></i>
                    </div>
                  </div>
                  {!tried ? (
                    <>
                      <h4 className="card-title">Schedule Assessment</h4>
                      <p className="card-text">
                        Schedule your assessment and start your journey towards
                        your license with Confidence.
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="card-title">Schedule Appointment</h4>
                      <p className="card-text">
                        Schedule your next Lesson or Road test appointment and
                        achieve your driving dreams.
                      </p>
                    </>
                  )}
                  <Link
                    to={`/user-appointment/${auth.userId}`}
                    className="btn btn-soft-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
              {/* <!-- end col --> */}
              <div className="col-xxl-4 col-lg-6">
                <div className="card card-body text-center card-warning">
                  <div className="avatar-sm mx-auto mb-3">
                    <div className="avatar-title bg-warning-subtle text-warning fs-17 rounded">
                      <i className="ri-check-double-fill"></i>
                    </div>
                  </div>
                  <h4 className="card-title">Confirm Appointment</h4>
                  {confirmApp?.length > 0 ? (
                    <>
                      <p className="card-text">
                        Confirm that you will be there for your scheduled
                        appointment.
                      </p>
                      <button
                        onClick={() => {
                          confirmToggler(true);
                        }}
                        className="btn btn-soft-warning"
                      >
                        Confirm
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text">
                        Book your appointment/assessment first, you will be able
                        to confirm it after payment is made.
                      </p>
                      <Link
                        to={`/user-appointment/${auth.userId}`}
                        className="btn btn-soft-warning"
                      >
                        Book Now
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {/* <!-- end col --> */}
              <div className="col-xxl-4 col-lg-6">
                <div className="card card-body text-center card-danger">
                  <div className="avatar-sm mx-auto mb-3">
                    <div className="avatar-title bg-danger-subtle text-danger fs-17 rounded">
                      <i className="ri-money-dollar-box-fill"></i>
                    </div>
                  </div>
                  <h4 className="card-title">Make Payment</h4>
                  {payApp?.length > 0 ? (
                    <>
                      <p className="card-text">
                        Upload your interac screenshot along with the number to
                        confirm your appointment.
                      </p>
                      <button
                        onClick={() => {
                          show.showToggler(true);
                        }}
                        className="btn btn-soft-danger"
                      >
                        Pay
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text">
                        Book your appointment/assessment first, you will be able
                        to pay and confirm for it once an admin has approved it.
                      </p>
                      <Link
                        to={`/user-appointment/${auth.userId}`}
                        className="btn btn-soft-danger"
                      >
                        Book Now
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
          <SucessApp userID={userID} appDet={confirmApp} />
        </ConfirmContext.Provider>
      )}
      <Payment userID={userID} />
    </>
  );
}

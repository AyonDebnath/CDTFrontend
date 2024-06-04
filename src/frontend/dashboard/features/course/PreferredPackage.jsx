import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { PaymentModalContext } from "../../context/payment-context";
import AppointmentPay from "../modals/appointmentPay";

export default function PreferredPackage() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const [courseData, setCourseData] = useState();
  const [pay, setPay] = useState(false);
  const [amount, setAmount] = useState();
  const [number, setNumber] = useState();
  const [name, setName] = useState();
  const [duration, setDuration] = useState();
  const userID = useParams().uid;

  const warnings = {
    war1: (
      <p>
        You're paying <strong className="text-success">${amount}</strong>
      </p>
    ),
    war2: (
      <p>
        You're paying for an <strong>Course</strong>
      </p>
    ),
    war3: (
      <p>
        There is no <strong>Refunds</strong> once you attend a lesson.
      </p>
    ),
    war4: (
      <p>
        Please Check the details again before making <strong>Payment</strong> to
        avoid any issues.
      </p>
    ),
    war5: (
      <p>
        Please wait <strong>24 Hour</strong> before the course lessons are added
        to your profile.
      </p>
    ),
    war6: (
      <p className="text-danger">DO NOT PAY TWICE UNDER ANY CIRCUMSTANCES.</p>
    ),
    war7: (
      <p className="text-danger">
        DO NOT GO OUT OF THIS MODAL WHILE PROCESSING
      </p>
    ),
  };

  const warnings2 = {
    war1: (
      <h2 className="text-warning">
        Please Book Lesson For Your Active Course{" "}
        <span className="text-danger">{userData?.activeCourse}</span> First.
        Before Purchasing Another Course.
      </h2>
    ),
  };

  const payToggler = (val) => {
    setPay(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );

        setUserData(responseData.user);

        try {
          const responseData2 = await sendRequest(
            `${import.meta.env.VITE_SERVER_NAME}api/dashboard/course/info/${
              responseData.user.suggestedCourse
            }`
          );
          setCourseData(responseData2.course);
        } catch (err) {
          console.log(err);
        }
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
      {courseData && (
        <PaymentModalContext.Provider
          value={{ payNow: pay, payToggler: payToggler }}
        >
          <div className="col-lg-6">
            <div className="card pricing-box card-warning ribbon-box ribbon-fill text-center">
              <div className="ribbon ribbon-success">New</div>
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body h-100">
                    <div>
                      <h5 className="mb-1 text-white">{courseData.name}</h5>
                    </div>

                    <div className="py-4">
                      <h2 className="text-white">
                        <sup>
                          <small>$</small>
                        </sup>
                        {courseData.price}{" "}
                        <span className="fs-13 text-white">/Total</span>
                      </h2>
                    </div>

                    <div className="text-center plan-btn mt-2">
                      <button
                        onClick={() => {
                          payToggler(true);
                          setAmount(courseData.price);
                          setNumber(courseData.number);
                          setName(courseData.name);
                          setDuration(courseData.duration);
                        }}
                        className="btn btn-soft-primary w-sm waves-effect waves-light"
                      >
                        Sign Up
                      </button>
                    </div>
                    {amount && number && name && duration && (
                      <AppointmentPay
                        userData={userData}
                        amount={amount}
                        warning={
                          userData?.activeCourse == "N/A" ? warnings : warnings2
                        }
                        lesson={number}
                        courseName={name}
                        duration={duration}
                        val={userData?.activeCourse == "N/A" ? false : true}
                      />
                    )}
                  </div>
                </div>
                {/* <!--end col--> */}
                <div className="col-lg-6">
                  <div className="card-body border-start mt-4 mt-lg-0">
                    <div className="card-header bg-warning-subtle">
                      <h5 className="fs-15 mb-0 text-warning">
                        Plan Features:
                      </h5>
                    </div>
                    <div className="card-body pb-0">
                      <ul className="list-unstyled vstack gap-3 mb-0">
                        <li>
                          classNamees:{" "}
                          <span className="text-white fw-semibold">3</span>
                        </li>
                        <li>
                          Duration:{" "}
                          <span className="text-white fw-semibold">
                            3 Hours
                          </span>
                        </li>
                        <li>
                          Car:{" "}
                          <span className="text-white fw-semibold">Yes</span>
                        </li>
                        <li>
                          Assessment:{" "}
                          <span className="text-white fw-semibold">Yes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
            </div>
          </div>
        </PaymentModalContext.Provider>
      )}
    </>
  );
}

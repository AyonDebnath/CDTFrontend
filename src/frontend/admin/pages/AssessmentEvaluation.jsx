import { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAuthContext } from "../../shared/context/admin-auth-context";

export default function AssessmentEvaluate() {
  const initialState = {
    failsToCompleteStop: {
      name: "Fails to Come to a Complete Stop",
      val: 0,
    },
    failsTrafficCheck: {
      name: "Fails to Check Traffic at All",
      val: 0,
    },
    failsToStopRed: {
      name: "Fails to Stop for Red Light",
      val: 0,
    },
    failsToSeatbelt: {
      name: "Fails to use Seatbelt",
      val: 0,
    },
    failsToCare: {
      name: "Fails to Drive with Due Care and Attention",
      val: 0,
    },
    failsToDevice: {
      name: "Fails to Obey Traffic Control Device",
      val: 0,
    },
    failsToEmergency: {
      name: "Fails to Stop for Emergency Vehicle",
      val: 0,
    },
    failsToMoveOver: {
      name: "Fails to Obey Move Over Law",
      val: 0,
    },
    exceedsPosted: {
      name: "Exceeds Posted Limit",
      val: 0,
    },
    tooFastCondition: {
      name: "Too Fast for Condition",
      val: 0,
    },
    passesUnsafe: {
      name: "Passes Where Unsafe",
      val: 0,
    },
    changingSolidLane: {
      name: "Changing Lane on a Solid Line",
      val: 0,
    },
    wrongSideDriving: {
      name: "Drives on Wrong Side of Street",
      val: 0,
    },
    collisionMiss: {
      name: "Collision or Near Miss",
      val: 0,
    },
    assumesRightWay: {
      name: "Assumes the Right of Way",
      val: 0,
    },
    notGrantingPeds: {
      name: "Not Granting to Pedestrians",
      val: 0,
    },
    poorAttitude: {
      name: "Very Poor Attitude",
      val: 0,
    },
    failsBlindSpot: {
      name: "Fails to Check Blind Spot",
      val: 0,
    },
    uncertainYield: {
      name: "Uncertain When to Take or Yield",
      val: 0,
    },
    failsToPass: {
      name: "Fails to Give Way When Being Passed",
      val: 0,
    },
    notInchBoth: {
      name: "Not Within 12 Inches Both Ways",
      val: 0,
    },
    improperPosition: {
      name: "Improper Position",
      val: 0,
    },
    curbStrike: {
      name: "Strikes Curb",
      val: 0,
    },
    failsObserveTraffic: {
      name: "Fails to Observe Traffic",
      val: 0,
    },
    improperBrake: {
      name: "Improper Use of Brakes",
      val: 0,
    },
    strikeStanchion: {
      name: "Strike Stanchion",
      val: 0,
    },
    failAnglePark: {
      name: "Fails to Angle Park in Two Attempt",
      val: 0,
    },
    failsParallel: {
      name: "Fails to Parallel Park Three Attempts",
      val: 0,
    },
    unstableHands: {
      name: "Hands in Unstable Position",
      val: 0,
    },
    unReasonableStop: {
      name: "Unreasonable Stop on Amber Light",
      val: 0,
    },
    continuousSteering: {
      name: "Continuous Steering with One Hand",
      val: 0,
    },
    erraticDriving: {
      name: "Erratic/Weaving from sides or straddles",
      val: 0,
    },
    uncertainSteering: {
      name: "Uncertain or Oversteering",
      val: 0,
    },
    followsClosely: {
      name: "Follows too closely",
      val: 0,
    },
    improperSpeed: {
      name: "Improper or Excessive Speed",
      val: 0,
    },
    improperSignal: {
      name: "Improper or No Signal",
      val: 0,
    },
    stopsGreen: {
      name: "Stops on Green Arrow When not Necessary",
      val: 0,
    },
    greenTraffic: {
      name: "Stops on Green Light Blocking Traffic",
      val: 0,
    },
    failsLightChange: {
      name: "Fails to Respond to Light Change",
      val: 0,
    },
    failsRightRed: {
      name: "Fails to Turn Right on Red Light",
      val: 0,
    },
    improperApproach: {
      name: "Improper Aprroach to Green Light",
      val: 0,
    },
    approachFast: {
      name: "Approaches Signal too Fast",
      val: 0,
    },
    improperLane: {
      name: "Improper Speed or Lane Change",
      val: 0,
    },
    hindersSLowly: {
      name: "Hinders or Drives too Slowly",
      val: 0,
    },
    improperMerge: {
      name: "Improper Merge Speed",
      val: 0,
    },
    failsAmberLight: {
      name: "Not Stopping as Required on Amber Light",
      val: 0,
    },
    drivingObscured: {
      name: "Driving with Vision Obscured",
      val: 0,
    },
    startsBeforeGreen: {
      name: "Starts Before Light Turns Green",
      val: 0,
    },
    failsProperLane: {
      name: "Fails to Turn into Proper Lane",
      val: 0,
    },
    closeToParked: {
      name: "Too Close to Parked Vehicle",
      val: 0,
    },
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();

  const [inputState, setInputState] = useState(initialState);
  const [total, setTotal] = useState(0);
  const appID = useParams().appid;
  const userID = useParams().uid;
  const adminAuth = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
      );

      setUserData(responseData.user);
    };
    fetchData();
  }, [sendRequest, userID]);

  const totalChanger = (valu) => {
    setTotal(total + valu);

    console.log(total + valu);
  };

  const submitAssessment = async () => {
    const assessArray = Object.entries(inputState);

    const filteredArr = assessArray.filter(([key, value]) => value.val !== 0);

    const assessment = Object.fromEntries(filteredArr);

    try {
      const formData = new FormData();
      formData.append("name", userData.fname + " " + userData.lname);
      formData.append("email", userData.email);
      formData.append("userId", userID);
      formData.append("appointmentId", appID);
      formData.append("infractionsStr", JSON.stringify(assessment));
      formData.append("total", total);
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/user/create/assessment`,
        "POST",
        formData,
        { Authorization: "Bearer " + adminAuth.adminToken }
      );

      navigate(`/admin/${adminAuth.adminId}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {userData && (
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Assessment</h4>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <a href="#violation">
                      <span className="fs-20 badge bg-success-subtle text-success">
                        {" "}
                        One Violation Fail
                      </span>
                    </a>
                  </div>
                  <div>
                    <a href="#parking">
                      <span className="fs-20 badge bg-success-subtle text-success">
                        Parking
                      </span>
                    </a>
                  </div>
                  <div>
                    <a href="#common">
                      <span className="fs-20 badge bg-success-subtle text-success">
                        Common Infractions
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row gy-4" id="violation">
                  <h4 className="text-danger bg-danger-subtle pt-2 pb-2 text-center">
                    One Violation Fail
                  </h4>
                  <div className="col-6">
                    <div>
                      <h3 className="fs-20 fw-medium text-center">
                        Fails to Come to a Complete Stop
                      </h3>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToCompleteStop.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToCompleteStop: {
                                name: prevState.failsToCompleteStop.name,
                                val: prevState.failsToCompleteStop.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToCompleteStop.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToCompleteStop: {
                                name: prevState.failsToCompleteStop.name,
                                val: prevState.failsToCompleteStop.val + 50,
                              },
                            }));
                          }}
                          type="button"
                          className="plus material-shadow"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Check Traffic at All
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsTrafficCheck.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsTrafficCheck: {
                                name: prevState.failsTrafficCheck.name,
                                val: prevState.failsTrafficCheck.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsTrafficCheck.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsTrafficCheck: {
                                name: prevState.failsTrafficCheck.name,
                                val: prevState.failsTrafficCheck.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Stop for Red Light
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToStopRed.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToStopRed: {
                                name: prevState.failsToStopRed.name,
                                val: prevState.failsToStopRed.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToStopRed.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToStopRed: {
                                name: prevState.failsToStopRed.name,
                                val: prevState.failsToStopRed.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to use Seatbelt
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToSeatbelt.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToSeatbelt: {
                                name: prevState.failsToSeatbelt.name,
                                val: prevState.failsToSeatbelt.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToSeatbelt.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToSeatbelt: {
                                name: prevState.failsToSeatbelt.name,
                                val: prevState.failsToSeatbelt.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Drive with Due Care and Attention
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToCare.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToCare: {
                                name: prevState.failsToCare.name,
                                val: prevState.failsToCare.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToCare.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToCare: {
                                name: prevState.failsToCare.name,
                                val: prevState.failsToCare.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Obey Traffic Control Device
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToDevice.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToDevice: {
                                name: prevState.failsToDevice.name,
                                val: prevState.failsToDevice.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToDevice.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToDevice: {
                                name: prevState.failsToDevice.name,
                                val: prevState.failsToDevice.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Stop for Emergency Vehicle
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToEmergency.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToEmergency: {
                                name: prevState.failsToEmergency.name,
                                val: prevState.failsToEmergency.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToEmergency.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToEmergency: {
                                name: prevState.failsToEmergency.name,
                                val: prevState.failsToEmergency.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Obey Move Over Law
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToMoveOver.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToMoveOver: {
                                name: prevState.failsToMoveOver.name,
                                val: prevState.failsToMoveOver.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToMoveOver.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToMoveOver: {
                                name: prevState.failsToMoveOver.name,
                                val: prevState.failsToMoveOver.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Exceeds Posted Limit
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.exceedsPosted.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              exceedsPosted: {
                                name: prevState.exceedsPosted.name,
                                val: prevState.exceedsPosted.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.exceedsPosted.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              exceedsPosted: {
                                name: prevState.exceedsPosted.name,
                                val: prevState.exceedsPosted.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Too Fast for Condition
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.tooFastCondition.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              tooFastCondition: {
                                name: prevState.tooFastCondition.name,
                                val: prevState.tooFastCondition.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.tooFastCondition.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              tooFastCondition: {
                                name: prevState.tooFastCondition.name,
                                val: prevState.tooFastCondition.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Passes Where Unsafe
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.passesUnsafe.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              passesUnsafe: {
                                name: prevState.passesUnsafe.name,
                                val: prevState.passesUnsafe.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.passesUnsafe.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              passesUnsafe: {
                                name: prevState.passesUnsafe.name,
                                val: prevState.passesUnsafe.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Changing Lane on a Solid Line
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.changingSolidLane.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              changingSolidLane: {
                                name: prevState.changingSolidLane.name,
                                val: prevState.changingSolidLane.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.changingSolidLane.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              changingSolidLane: {
                                name: prevState.changingSolidLane.name,
                                val: prevState.changingSolidLane.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Drives on Wrong Side of Street
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.wrongSideDriving.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              wrongSideDriving: {
                                name: prevState.wrongSideDriving.name,
                                val: prevState.wrongSideDriving.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.wrongSideDriving.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              wrongSideDriving: {
                                name: prevState.wrongSideDriving.name,
                                val: prevState.wrongSideDriving.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Collision or Near Miss
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.collisionMiss.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              collisionMiss: {
                                name: prevState.collisionMiss.name,
                                val: prevState.collisionMiss.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.collisionMiss.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              collisionMiss: {
                                name: prevState.collisionMiss.name,
                                val: prevState.collisionMiss.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Assumes the Right of Way
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.assumesRightWay.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              assumesRightWay: {
                                name: prevState.assumesRightWay.name,
                                val: prevState.assumesRightWay.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.assumesRightWay.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              assumesRightWay: {
                                name: prevState.assumesRightWay.name,
                                val: prevState.assumesRightWay.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Not Granting to Pedestrians
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.notGrantingPeds.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              notGrantingPeds: {
                                name: prevState.notGrantingPeds.name,
                                val: prevState.notGrantingPeds.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.notGrantingPeds.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              notGrantingPeds: {
                                name: prevState.notGrantingPeds.name,
                                val: prevState.notGrantingPeds.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Very Poor Attitude
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.poorAttitude.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              poorAttitude: {
                                name: prevState.poorAttitude.name,
                                val: prevState.poorAttitude.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.poorAttitude.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              poorAttitude: {
                                name: prevState.poorAttitude.name,
                                val: prevState.poorAttitude.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Check Blind Spot
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsBlindSpot.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsBlindSpot: {
                                name: prevState.failsBlindSpot.name,
                                val: prevState.failsBlindSpot.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsBlindSpot.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsBlindSpot: {
                                name: prevState.failsBlindSpot.name,
                                val: prevState.failsBlindSpot.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Uncertain When to Take or Yield
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.uncertainYield.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              uncertainYield: {
                                name: prevState.uncertainYield.name,
                                val: prevState.uncertainYield.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.uncertainYield.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              uncertainYield: {
                                name: prevState.uncertainYield.name,
                                val: prevState.uncertainYield.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Give Way When Being Passed
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsToPass.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToPass: {
                                name: prevState.failsToPass.name,
                                val: prevState.failsToPass.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsToPass.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsToPass: {
                                name: prevState.failsToPass.name,
                                val: prevState.failsToPass.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gy-4 mt-5" id="parking">
                  <h4 className="text-danger bg-danger-subtle pt-2 pb-2 text-center">
                    Parking
                  </h4>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Not Within 12 Inches Both Ways
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.notInchBoth.val === 0}
                          onClick={() => {
                            totalChanger(-5);
                            setInputState((prevState) => ({
                              ...prevState,
                              notInchBoth: {
                                name: prevState.notInchBoth.name,
                                val: prevState.notInchBoth.val - 5,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.notInchBoth.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(5);
                            setInputState((prevState) => ({
                              ...prevState,
                              notInchBoth: {
                                name: prevState.notInchBoth.name,
                                val: prevState.notInchBoth.val + 5,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper Position
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperPosition.val === 0}
                          onClick={() => {
                            totalChanger(-5);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperPosition: {
                                name: prevState.improperPosition.name,
                                val: prevState.improperPosition.val - 5,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperPosition.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(5);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperPosition: {
                                name: prevState.improperPosition.name,
                                val: prevState.improperPosition.val + 5,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Strikes Curb
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.curbStrike.val === 0}
                          onClick={() => {
                            totalChanger(-5);
                            setInputState((prevState) => ({
                              ...prevState,
                              curbStrike: {
                                name: prevState.curbStrike.name,
                                val: prevState.curbStrike.val - 5,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.curbStrike.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(5);
                            setInputState((prevState) => ({
                              ...prevState,
                              curbStrike: {
                                name: prevState.curbStrike.name,
                                val: prevState.curbStrike.val + 5,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Observe Traffic
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsObserveTraffic.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsObserveTraffic: {
                                name: prevState.failsObserveTraffic.name,
                                val: prevState.failsObserveTraffic.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsObserveTraffic.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsObserveTraffic: {
                                name: prevState.failsObserveTraffic.name,
                                val: prevState.failsObserveTraffic.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper Use of Brakes
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperBrake.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperBrake: {
                                name: prevState.improperBrake.name,
                                val: prevState.improperBrake.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperBrake.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperBrake: {
                                name: prevState.improperBrake.name,
                                val: prevState.improperBrake.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Strike Stanchion
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.strikeStanchion.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              strikeStanchion: {
                                name: prevState.strikeStanchion.name,
                                val: prevState.strikeStanchion.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.strikeStanchion.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              strikeStanchion: {
                                name: prevState.strikeStanchion.name,
                                val: prevState.strikeStanchion.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Angle Park in Two Attempt
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failAnglePark.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failAnglePark: {
                                name: prevState.failAnglePark.name,
                                val: prevState.failAnglePark.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failAnglePark.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failAnglePark: {
                                name: prevState.failAnglePark.name,
                                val: prevState.failAnglePark.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Parallel Park Three Attempts
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsParallel.val === 0}
                          onClick={() => {
                            totalChanger(-50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsParallel: {
                                name: prevState.failsParallel.name,
                                val: prevState.failsParallel.val - 50,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsParallel.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(50);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsParallel: {
                                name: prevState.failsParallel.name,
                                val: prevState.failsParallel.val + 50,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gy-4 mt-5" id="common">
                  <h4 className="text-danger bg-danger-subtle pt-2 pb-2 text-center">
                    Common Infractions
                  </h4>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Hands in Unstable Position
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.unstableHands.val === 0}
                          onClick={() => {
                            totalChanger(-5);
                            setInputState((prevState) => ({
                              ...prevState,
                              unstableHands: {
                                name: prevState.unstableHands.name,
                                val: prevState.unstableHands.val - 5,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.unstableHands.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(5);
                            setInputState((prevState) => ({
                              ...prevState,
                              unstableHands: {
                                name: prevState.unstableHands.name,
                                val: prevState.unstableHands.val + 5,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Unreasonable Stop on Amber Light
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.unReasonableStop.val === 0}
                          onClick={() => {
                            totalChanger(-5);
                            setInputState((prevState) => ({
                              ...prevState,
                              unReasonableStop: {
                                name: prevState.unReasonableStop.name,
                                val: prevState.unReasonableStop.val - 5,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.unReasonableStop.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(5);
                            setInputState((prevState) => ({
                              ...prevState,
                              unReasonableStop: {
                                name: prevState.unReasonableStop.name,
                                val: prevState.unReasonableStop.val + 5,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Continuous Steering with One Hand
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.continuousSteering.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              continuousSteering: {
                                name: prevState.continuousSteering.name,
                                val: prevState.continuousSteering.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.continuousSteering.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              continuousSteering: {
                                name: prevState.continuousSteering.name,
                                val: prevState.continuousSteering.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Erratic/Weaving from sides or straddles
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.erraticDriving.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              erraticDriving: {
                                name: prevState.erraticDriving.name,
                                val: prevState.erraticDriving.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.erraticDriving.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              erraticDriving: {
                                name: prevState.erraticDriving.name,
                                val: prevState.erraticDriving.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h3 className="fs-20 fw-medium text-center">
                        Uncertain or Oversteering
                      </h3>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.uncertainSteering.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              uncertainSteering: {
                                name: prevState.uncertainSteering.name,
                                val: prevState.uncertainSteering.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.uncertainSteering.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              uncertainSteering: {
                                name: prevState.uncertainSteering.name,
                                val: prevState.uncertainSteering.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Follows too closely
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.followsClosely.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              followsClosely: {
                                name: prevState.followsClosely.name,
                                val: prevState.followsClosely.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.followsClosely.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              followsClosely: {
                                name: prevState.followsClosely.name,
                                val: prevState.followsClosely.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper or Excessive Speed
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperSpeed.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperSpeed: {
                                name: prevState.improperSpeed.name,
                                val: prevState.improperSpeed.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperSpeed.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperSpeed: {
                                name: prevState.improperSpeed.name,
                                val: prevState.improperSpeed.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper or No Signal
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperSignal.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperSignal: {
                                name: prevState.improperSignal.name,
                                val: prevState.improperSignal.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperSignal.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperSignal: {
                                name: prevState.improperSignal.name,
                                val: prevState.improperSignal.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Stops on Green Arrow When not Necessary
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.stopsGreen.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              stopsGreen: {
                                name: prevState.stopsGreen.name,
                                val: prevState.stopsGreen.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.stopsGreen.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              stopsGreen: {
                                name: prevState.stopsGreen.name,
                                val: prevState.stopsGreen.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Stops on Green Light Blocking Traffic
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.greenTraffic.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              greenTraffic: {
                                name: prevState.greenTraffic.name,
                                val: prevState.greenTraffic.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.greenTraffic.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              greenTraffic: {
                                name: prevState.greenTraffic.name,
                                val: prevState.greenTraffic.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Respond to Light Change
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsLightChange.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsLightChange: {
                                name: prevState.failsLightChange.name,
                                val: prevState.failsLightChange.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsLightChange.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsLightChange: {
                                name: prevState.failsLightChange.name,
                                val: prevState.failsLightChange.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Turn Right on Red Light
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsRightRed.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsRightRed: {
                                name: prevState.failsRightRed.name,
                                val: prevState.failsRightRed.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsRightRed.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsRightRed: {
                                name: prevState.failsRightRed.name,
                                val: prevState.failsRightRed.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper Aprroach to Green Light
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperApproach.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperApproach: {
                                name: prevState.improperApproach.name,
                                val: prevState.improperApproach.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperApproach.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperApproach: {
                                name: prevState.improperApproach.name,
                                val: prevState.improperApproach.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Approaches Signal too Fast
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.approachFast.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              approachFast: {
                                name: prevState.approachFast.name,
                                val: prevState.approachFast.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.approachFast.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              approachFast: {
                                name: prevState.approachFast.name,
                                val: prevState.approachFast.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper Speed or Lane Change
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperLane.val === 0}
                          onClick={() => {
                            totalChanger(-10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperLane: {
                                name: prevState.improperLane.name,
                                val: prevState.improperLane.val - 10,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperLane.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(10);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperLane: {
                                name: prevState.improperLane.name,
                                val: prevState.improperLane.val + 10,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Hinders or Drives too Slowly
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.hindersSLowly.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              hindersSLowly: {
                                name: prevState.hindersSLowly.name,
                                val: prevState.hindersSLowly.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.hindersSLowly.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              hindersSLowly: {
                                name: prevState.hindersSLowly.name,
                                val: prevState.hindersSLowly.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Improper Merge Speed
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.improperMerge.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperMerge: {
                                name: prevState.improperMerge.name,
                                val: prevState.improperMerge.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.improperMerge.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              improperMerge: {
                                name: prevState.improperMerge.name,
                                val: prevState.improperMerge.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Not Stopping as Required on Amber Light
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsAmberLight.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsAmberLight: {
                                name: prevState.failsAmberLight.name,
                                val: prevState.failsAmberLight.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsAmberLight.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsAmberLight: {
                                name: prevState.failsAmberLight.name,
                                val: prevState.failsAmberLight.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Driving with Vision Obscured
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.drivingObscured.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              drivingObscured: {
                                name: prevState.drivingObscured.name,
                                val: prevState.drivingObscured.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.drivingObscured.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              drivingObscured: {
                                name: prevState.drivingObscured.name,
                                val: prevState.drivingObscured.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Starts Before Light Turns Green
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.startsBeforeGreen.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              startsBeforeGreen: {
                                name: prevState.startsBeforeGreen.name,
                                val: prevState.startsBeforeGreen.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.startsBeforeGreen.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              startsBeforeGreen: {
                                name: prevState.startsBeforeGreen.name,
                                val: prevState.startsBeforeGreen.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Fails to Turn into Proper Lane
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.failsProperLane.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsProperLane: {
                                name: prevState.failsProperLane.name,
                                val: prevState.failsProperLane.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.failsProperLane.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              failsProperLane: {
                                name: prevState.failsProperLane.name,
                                val: prevState.failsProperLane.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h5 className="fs-20 fw-medium text-center">
                        Too Close to Parked Vehicle
                      </h5>
                      <div
                        className="input-step step-success"
                        style={{ width: "100%" }}
                      >
                        <button
                          type="button"
                          className="minus material-shadow"
                          disabled={inputState.closeToParked.val === 0}
                          onClick={() => {
                            totalChanger(-20);
                            setInputState((prevState) => ({
                              ...prevState,
                              closeToParked: {
                                name: prevState.closeToParked.name,
                                val: prevState.closeToParked.val - 20,
                              },
                            }));
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-quantity"
                          value={inputState.closeToParked.val}
                          min="0"
                          max="100"
                          readOnly
                          style={{ width: "100%" }}
                        />
                        <button
                          type="button"
                          className="plus material-shadow"
                          onClick={() => {
                            totalChanger(20);
                            setInputState((prevState) => ({
                              ...prevState,
                              closeToParked: {
                                name: prevState.closeToParked.name,
                                val: prevState.closeToParked.val + 20,
                              },
                            }));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around mb-2 bg-success-subtle pt-2">
                <div>
                  <h6 className="pt-1">Total</h6>
                </div>
                <div>
                  <h4>
                    <span className="badge bg-success-subtle text-success">
                      {total}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="d-flex justify-content-center mb-5">
                <button className="btn btn-success" onClick={submitAssessment}>
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      )}
    </>
  );
}

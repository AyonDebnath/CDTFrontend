import { useState } from "react";

export default function Score() {
  const [cardNum, setCardNum] = useState("card1");

  return (
    <div
      id="scoreModal"
      className="modal flip"
      tabIndex="-1"
      aria-labelledby="scoreLabel"
      aria-hidden="true"
      // style="display: none"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="scoreLabel">
              Latest Assessment Score Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {cardNum === "card1" && (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        className="nav flex-column nav-pills text-center"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link mb-2 active"
                          id="v-pills-starting-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-starting"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          Starting & Shifting
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-stopping-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-stopping"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Stopping
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-steering-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-steering"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Steering
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-signaling-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-signaling"
                          role="tab"
                          aria-controls="v-pills-settings"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Signal Violations
                        </a>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-md-9">
                      <div
                        className="tab-content text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="v-pills-starting"
                          role="tabpanel"
                          aria-labelledby="v-pills-starting-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Check Traffic
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fast or Uneven Gateway
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Rolls When on Grade
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Using Left Foot on Brake
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Use Seatbelt
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Coasts in Neutral (Passenger Vehicle)
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-stopping"
                          role="tabpanel"
                          aria-labelledby="v-pills-stopping-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Stops too Suddenly
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Stops too Close to a Vehicle
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Stops in an Unsafe Place
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Overrunning Crosswalk
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Using Parking Brake on Air Equipped
                                        Vehicles While Vehicle Still Moving
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-steering"
                          role="tabpanel"
                          aria-labelledby="v-pills-steering-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Continuous Steering with One Hand
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Weaving from Side to Side
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Oversteering
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Hands in Unstable Position
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-signaling"
                          role="tabpanel"
                          aria-labelledby="v-pills-signaling-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Improper or No Signal
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--  end col --> */}
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!-- end card-body --> */}
              </div>
            )}
            {cardNum === "card2" && (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        className="nav flex-column nav-pills text-center"
                        id="v-pills-tab2"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link mb-2 active active-infraction"
                          id="v-pills-traffic-lights-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-traffic-lights"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          Traffic Lights
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-stop-sign-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-stop-sign"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Stop Sign
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-laning-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-laning"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Lane Observance
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-turning-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-turning"
                          role="tab"
                          aria-controls="v-pills-settings"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Turning
                        </a>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-md-9">
                      <div
                        className="tab-content text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent2"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="v-pills-traffic-lights"
                          role="tabpanel"
                          aria-labelledby="v-pills-traffic-lights-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Unreasonable Stop on Amber Light
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Not Stopping on Amber Light as Required
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Stops on Green Arrow When Not Necessary
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Stops on Green Light Blocking Traffic
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Starts Before Light Turns Green
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                    <tr>
                                      <td className="text-danger">
                                        Fails to Stop on Red Light
                                      </td>
                                      <td className="text-danger">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Respond to Light Change
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Turn Right on Red Light
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Approach to Green Light
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-stop-sign"
                          role="tabpanel"
                          aria-labelledby="v-pills-stop-sign-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Approaches Sign too Fast
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Stop Made in Improper Position
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Hesitant in Leaving
                                      </td>
                                      <td className="text-primary">05</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Come to a Complete Stop
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-laning"
                          role="tabpanel"
                          aria-labelledby="v-pills-laning-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Drive in Proper Lane
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Check Traffic at All
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Check Blind Spots
                                      </td>
                                      <td className="text-primary">15</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Straddles Traffic Lanes
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Slow Changing Lanes
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Lane Change
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Changing on a Solid Line
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-turning"
                          role="tabpanel"
                          aria-labelledby="v-pills-turning-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Speed
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Strikes Curb
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Turn into Proper Lane
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Turn
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--  end col --> */}
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!-- end card-body --> */}
              </div>
            )}
            {cardNum === "card3" && (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        className="nav flex-column nav-pills text-center"
                        id="v-pills-tab3"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link mb-2 active"
                          id="v-pills-passing-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-passing"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          Passing
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-speeding-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-speeding"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Speed
                        </a>
                        <a
                          className="nav-link mb-2 active-infraction"
                          id="v-pills-moving-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-moving"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Vehicles Moving on Roadway/ on Straightway
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-right-way-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-right-way"
                          role="tab"
                          aria-controls="v-pills-settings"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Right of Way
                        </a>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-md-9">
                      <div
                        className="tab-content text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent3"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="v-pills-passing"
                          role="tabpanel"
                          aria-labelledby="v-pills-passing-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Passes Where Unlawful
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Cuts Back too Soon
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Give Way When Being Passed
                                      </td>
                                      <td className="text-primary">15</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-speeding"
                          role="tabpanel"
                          aria-labelledby="v-pills-speeding-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Exceeds Stated Speed Limit
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Too Fast for Condition
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Hinders or Drives too Slow
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Erratic or Not Steady
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Merge Speed
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-moving"
                          role="tabpanel"
                          aria-labelledby="v-pills-moving-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Follows too Closely
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Drives on Wrong Side of Street
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Straddles Center Line
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Wrong Side of Island
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Use Mirror
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-danger">
                                        Enters Intersection Without Clear Exit
                                      </td>
                                      <td className="text-danger">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Drives on Shoulder of Road
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Obey Traffic Control Device
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Too Close to Parked Cars
                                      </td>
                                      <td className="text-primary">20</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Fails to Stop for Emergency Vehicle
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Merge on Highway
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Exit on Highway
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Failure to Obey "Move Over Law"
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-right-way"
                          role="tabpanel"
                          aria-labelledby="v-pills-right-way-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Uncertain When to Take or Yield
                                      </td>
                                      <td className="text-primary">15</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Assumes the Right of Way
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Not Granting to Pedestrians
                                      </td>
                                      <td className="text-primary">50</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--  end col --> */}
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!-- end card-body --> */}
              </div>
            )}
            {cardNum === "card4" && (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        className="nav flex-column nav-pills text-center"
                        id="v-pills-tab4"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link mb-2 active"
                          id="v-pills-backing-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-backing"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          Backing
                        </a>
                        <a
                          className="nav-link mb-2 active-infraction"
                          id="v-pills-parking-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-parking"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Parking
                        </a>
                        <a
                          className="nav-link mb-2"
                          id="v-pills-general-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-general"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          General
                        </a>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-md-9">
                      <div
                        className="tab-content text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent4"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="v-pills-backing"
                          role="tabpanel"
                          aria-labelledby="v-pills-backing-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Infraction</th>
                                      <th scope="col">Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-primary">
                                        Uncertain Steering
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Excessive Speed
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                    <tr>
                                      <td className="text-primary">
                                        Improper Braking
                                      </td>
                                      <td className="text-primary">10</td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!-- end table --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-parking"
                          role="tabpanel"
                          aria-labelledby="v-pills-parking-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="flex-grow-1 ms-3">
                                <div className="table-responsive">
                                  <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                      <tr>
                                        <th scope="col">Infraction</th>
                                        <th scope="col">Points</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-primary">
                                          Fails to Observe Traffic
                                        </td>
                                        <td className="text-primary">10</td>
                                      </tr>
                                      <tr>
                                        <td className="text-danger">
                                          Improper Position
                                        </td>
                                        <td className="text-danger">05</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Not Within 12 inches Both Wheels
                                        </td>
                                        <td className="text-primary">05</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Strikes Stanchions
                                        </td>
                                        <td className="text-primary">50</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Strikes Curb
                                        </td>
                                        <td className="text-primary">05</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Improper Use of Brakes
                                        </td>
                                        <td className="text-primary">10</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Fails to Properly Parallel Park in
                                          Three Attempts
                                        </td>
                                        <td className="text-primary">50</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Fails to Angle Park Within Two
                                          Attempts
                                        </td>
                                        <td className="text-primary">50</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* <!-- end table --> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-general"
                          role="tabpanel"
                          aria-labelledby="v-pills-general-tab"
                        >
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1 ms-3">
                              <div className="flex-grow-1 ms-3">
                                <div className="table-responsive">
                                  <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                      <tr>
                                        <th scope="col">Infraction</th>
                                        <th scope="col">Points</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-primary">
                                          Improper Attitude
                                        </td>
                                        <td className="text-primary">10</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Driving with Vision Obscured
                                        </td>
                                        <td className="text-primary">20</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Adjusts Mirror When Driving
                                        </td>
                                        <td className="text-primary">05</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Very Poor Attitude
                                        </td>
                                        <td className="text-primary">25</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Collision or Near Miss
                                        </td>
                                        <td className="text-primary">50</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Fails to Drive with Due Care or
                                          Attention
                                        </td>
                                        <td className="text-primary">50</td>
                                      </tr>
                                      <tr>
                                        <td className="text-primary">
                                          Lacks Knowledge of Equipment
                                        </td>
                                        <td className="text-primary">10</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* <!-- end table --> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--  end col --> */}
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!-- end card-body --> */}
              </div>
            )}
            <div className="container">
              <div className="row">
                <div className="col-3"></div>
                <div className="col-9">
                  <table className="table table-nowrap">
                    <tfoot className="table-light">
                      <tr>
                        <td className="text-danger total-text">Total Points</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-danger total-text">65</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="container mt-10">
              <div className="row">
                <div className="col-lg-5 col-1"></div>
                <div className="col-lg-3 col-10">
                  <ul className="pagination pagination-rounded pagination-lg">
                    <li
                      id="pg1"
                      onClick={() => {
                        setCardNum("card1");
                      }}
                      className={`${
                        cardNum === "card1" && "active"
                      } " page-item"`}
                    >
                      <a className="page-link">1</a>
                    </li>
                    <li
                      id="pg2"
                      onClick={() => {
                        setCardNum("card2");
                      }}
                      className={`${
                        cardNum === "card2" && "active"
                      } "page-item points-page"`}
                    >
                      <a className="page-link">2</a>
                    </li>
                    <li
                      id="pg3"
                      onClick={() => {
                        setCardNum("card3");
                      }}
                      className={`${
                        cardNum === "card3" && "active"
                      } "page-item points-page"`}
                    >
                      <a className="page-link">3</a>
                    </li>
                    <li
                      id="pg4"
                      onClick={() => {
                        setCardNum("card4");
                      }}
                      className={`${
                        cardNum === "card4" && "active"
                      } "page-item points-page"`}
                    >
                      <a className="page-link">4</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-1"></div>
              </div>
            </div>
            {/* <!-- end table responsive --> */}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { AssessmentModalContext } from "../../context/assessment-modal-context";

import PropTypes from "prop-types";

export default function Score({ appID }) {
  const [assessment, setAssessment] = useState();
  const [infractions, setInfractions] = useState();

  const show = useContext(AssessmentModalContext);

  useEffect(() => {
    if (appID) {
      const fetchData = async () => {
        try {
          await fetch(
            `${
              import.meta.env.VITE_SERVER_NAME
            }api/dashboard/assessment/info/${appID}`
          ).then(async (r) => {
            const res = await r.json();
            setAssessment(res.assessment);
            setInfractions(Object.entries(res.assessment.infractions));
          });
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [appID]);

  return (
    <Modal
      isOpen={show.show}
      toggle={() => {
        show.showToggler(false);
      }}
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
              onClick={() => {
                show.showToggler(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {/* <!-- end col --> */}
                  <div className="col-12">
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
                                  {infractions?.length > 0 &&
                                    infractions.map((elem) => {
                                      return (
                                        <tr key={infractions.indexOf(elem)}>
                                          <td className="text-primary">
                                            {elem[1].name}
                                          </td>
                                          <td className="text-primary">
                                            {elem[1].val}
                                          </td>
                                        </tr>
                                      );
                                    })}
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

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <table className="table table-nowrap">
                    <tfoot className="table-light">
                      <tr>
                        <td className="text-danger total-text">Total Points</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-danger total-text">
                          {assessment?.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* <!-- end table responsive --> */}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                show.showToggler(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </Modal>
  );
}

Score.propTypes = {
  appID: PropTypes.string,
};

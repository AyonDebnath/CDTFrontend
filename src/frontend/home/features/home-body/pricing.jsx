import { useState } from "react";

function Pricing() {
  const [des1, setDes1] = useState(false);
  const [des2, setDes2] = useState(false);
  const [des3, setDes3] = useState(false);
  const [des4, setDes4] = useState(false);

  return (
    <div
      id="pricing-area"
      className="pricing-area overlay overlay-black overlay-40 pt-90 pb-60"
    >
      <div className="container">
        {/* <!-- Section Title --> */}
        <div className="row">
          <div className="section-title title-white text-center col-12 mb-45">
            <h3 className="heading">your pricing plan</h3>
            <div className="excerpt">
              <p>Explore our flexible and diverse plans.</p>
            </div>
            <i className="icofont icofont-traffic-light"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-12 mb-30">
            <div
              className={`single-pricing active1 text-center ${
                des1 ? "" : "pb-20"
              }`}
              id="single1"
            >
              <div
                className={`${des1 ? "margin-none" : ""} pricing-head`}
                id="heading1"
              >
                <h4>Single</h4>
              </div>
              <div
                className={`${des1 ? "" : "destroy"} pricing-dets`}
                id="details1"
              >
                <div
                  className="container"
                  onClick={() => {
                    setDes1(false);
                  }}
                >
                  <div className="row">
                    <div className="section-title text-center col-12 mab-5 single-title">
                      <h3 className="heading details-heading pt-10">
                        Single Lesson Details
                      </h3>
                      <i className="icofont icofont-traffic-light"></i>
                    </div>
                    <div className="feature-list">
                      <ul>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          First Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Second Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Third Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fourth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fifth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Sixth Feature
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className={`${des1 ? "destroy" : ""} pricing-price`}
                id="overview1"
                onClick={() => setDes1(true)}
              >
                <h2>
                  <span>$</span>105
                </h2>
                <h6>Choose Plan</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30">
            <div
              className={`single-pricing active2 text-center ${
                des2 ? "" : "pb-20"
              }`}
              id="single2"
            >
              <div
                className={`${des2 ? "margin-none" : ""} pricing-head`}
                id="heading2"
              >
                <h4>Road Test</h4>
              </div>
              <div
                className={`${des2 ? "" : "destroy"} pricing-dets`}
                id="details2"
              >
                <div
                  className="container"
                  onClick={() => {
                    setDes2(false);
                  }}
                >
                  <div className="row">
                    <div className="section-title text-center col-12 mab-5 single-title">
                      <h3 className="heading details-heading pt-10">
                        Road Test Lesson Details
                      </h3>
                      <i className="icofont icofont-traffic-light"></i>
                    </div>
                    <div className="feature-list">
                      <ul>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          First Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Second Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Third Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fourth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fifth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Sixth Feature
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className={`${des2 ? "destroy" : ""} pricing-price`}
                id="overview2"
                onClick={() => setDes2(true)}
              >
                <h2>
                  <span>$</span>175
                </h2>
                <h6>Choose Plan</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30">
            <div
              className={`single-pricing active3 text-center ${
                des3 ? "" : "pb-20"
              }`}
              id="single3"
            >
              <div
                className={`${des3 ? "margin-none" : ""} pricing-head`}
                id="heading3"
              >
                <h4>Most Popular</h4>
              </div>
              <div
                className={`${des3 ? "" : "destroy"} pricing-dets`}
                id="details3"
              >
                <div
                  className="container"
                  onClick={() => {
                    setDes3(false);
                  }}
                >
                  <div className="row">
                    <div className="section-title text-center col-12 mab-5 single-title">
                      <h3 className="heading details-heading pt-10">
                        Most Popular Lesson Details
                      </h3>
                      <i className="icofont icofont-traffic-light"></i>
                    </div>
                    <div className="feature-list">
                      <ul>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          First Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Second Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Third Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fourth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fifth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Sixth Feature
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className={`${des3 ? "destroy" : ""} pricing-price popular`}
                id="overview3"
                onClick={() => setDes3(true)}
              >
                <h2>
                  <span>$</span>280
                </h2>
                <h6>Choose Plan</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30">
            <div
              className={`single-pricing active4 text-center ${
                des4 ? "" : "pb-20"
              }`}
              id="single4"
            >
              <div
                className={`${des4 ? "margin-none" : ""} pricing-head`}
                id="heading4"
              >
                <h4>Certification</h4>
              </div>
              <div
                className={`${des4 ? "" : "destroy"} pricing-dets`}
                id="details4"
              >
                <div
                  className="container"
                  onClick={() => {
                    setDes4(false);
                  }}
                >
                  <div className="row">
                    <div className="section-title text-center col-12 mab-5 single-title">
                      <h3 className="heading details-heading pt-10">
                        Certificate Lesson Details
                      </h3>
                      <i className="icofont icofont-traffic-light"></i>
                    </div>
                    <div className="feature-list">
                      <ul>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          First Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Second Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Third Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fourth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Fifth Feature
                        </li>
                        <li>
                          <span className="pl-5">
                            <i className="icofont icofont-car-alt-4"></i>
                          </span>{" "}
                          Sixth Feature
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className={`${des4 ? "destroy" : ""} pricing-price`}
                id="overview4"
                onClick={() => setDes4(true)}
              >
                <h2>
                  <span>$</span>
                  900
                </h2>
                <h6>Choose Plan</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

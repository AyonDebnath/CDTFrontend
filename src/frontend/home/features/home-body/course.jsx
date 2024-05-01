/* eslint-disable react/no-unescaped-entities */
function Course() {
  return (
    <div id="course-area" className="course-area bg-gray pt-90 pb-60">
      <div className="container">
        {/* <!-- Section Title --> */}
        <div className="row">
          <div className="section-title text-center col-12 mb-45">
            <h3 className="heading">course Features</h3>
            <div className="excerpt">
              <p>Learn about the advantages of taking our course.</p>
            </div>
            <i className="icofont icofont-traffic-light"></i>
          </div>
        </div>
        {/* <!-- Course Wrapper --> */}
        <div className="course-wrapper row">
          <div className="col-lg-3 col-md-6 col-12 mb-30 fix">
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#normalModal"
            >
              <div className="course-item text-center">
                <i className="icofont icofont-car-alt-4"></i>
                <h4>normal driving</h4>
                <p>
                  Explore the nuanced techniques and invaluable tips of daily
                  driving, cultivating.
                  <span className="learn-more">...Learn More</span>
                </p>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30 fix">
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#defensiveModal"
            >
              <div className="course-item text-center">
                <i className="icofont icofont-ambulance-cross"></i>
                <h4>defensive</h4>
                <p>
                  Master the art of self-trust and safe driving amidst
                  challenging conditions and.
                  <span className="learn-more">...Learn More</span>
                </p>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30 fix">
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#confidenceModal"
            >
              <div className="course-item text-center">
                <i className="icofont icofont-fast-delivery"></i>
                <h4>confidence booster</h4>
                <p>
                  Cultivate confidence in vehicle operation for a truly
                  enjoyable and empowering.
                  <span className="learn-more">...Learn More</span>
                </p>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-30 fix">
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#learningModal"
            >
              <div className="course-item text-center">
                <i className="icofont icofont-rocket-alt-2"></i>
                <h4>fast learning</h4>
                <p>
                  If you're an experienced driver from abroad take our crash
                  course to learn about.
                  <span className="learn-more">...Learn More</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;

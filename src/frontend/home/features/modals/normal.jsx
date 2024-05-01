function NormalModal() {
  return (
    <div
      className=" modal modal-home fade"
      id="normalModal"
      aria-labelledby="normalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container">
              <div className="row">
                <div className="section-title text-center col-10 col-lg-11 mb-45 pt-20">
                  <h3 className="heading">Detailed Course Features</h3>
                  <i className="icofont icofont-traffic-light"></i>
                </div>
                <div className="col-2 col-lg-1">
                  <button
                    type="button"
                    className="close-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="icofont icofont-close-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="container pb-30">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-9 col-sm-12">
                  <p className="text-center normal-driving">
                    <i className="icofont icofont-car-alt-4"></i>
                  </p>
                  <div className="modal-course">
                    <h2 className="text-center pb-10 modal-course-title">
                      Normal Driving
                    </h2>
                  </div>
                  <p className="text-justify">
                    Embark on a transformative journey as you enroll in our
                    Normal Driving course, meticulously designed to equip you
                    with the skills and knowledge needed for everyday driving
                    scenarios. Delve into an immersive learning experience
                    guided by our certified instructors, each bringing a wealth
                    of expertise to the forefront. Our comprehensive curriculum
                    covers a spectrum of topics, including vehicle handling,
                    traffic navigation, and mastering the nuances of diverse
                    road conditions. Benefit from our state-of-the-art training
                    facilities and a fleet of well-maintained vehicles that
                    enhance your learning experience. Engage in hands-on
                    practice sessions, simulations, and real-world scenarios,
                    fostering a holistic understanding of normal driving
                    dynamics. Whether you are a novice driver or seeking to
                    enhance your existing skills, our course is tailored to
                    cater to diverse learning needs. Immerse yourself in an
                    environment that prioritizes your success, offering flexible
                    scheduling options to accommodate your lifestyle. Our
                    commitment to excellence extends beyond the basics,
                    providing personalized attention and constructive feedback
                    to nurture your growth as a confident and capable driver.
                    Join us on this educational journey and unlock the art of
                    normal driving — where safety, proficiency, and confidence
                    converge to make every journey an enjoyable and secure
                    experience.
                  </p>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-lg close-btn2"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalModal;

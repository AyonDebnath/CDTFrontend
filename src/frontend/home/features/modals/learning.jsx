function LearningModal() {
  return (
    <div
      className=" modal modal-home fade"
      id="learningModal"
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
                <div className="col-1">
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
                    <i className="icofont icofont-rocket-alt-2"></i>
                  </p>
                  <div className="modal-course">
                    <h2 className="text-center pb-10 modal-course-title">
                      Fast Learning
                    </h2>
                  </div>
                  <p className="text-justify">
                    Experience the pinnacle of efficiency and effectiveness with
                    our Fast Learning course, a cutting-edge program designed
                    for those who seek an expedited path to driving mastery. Led
                    by our expert instructors, this course is engineered to
                    condense traditional learning into an intensive yet highly
                    rewarding experience. Dive into a curriculum that
                    prioritizes essential driving skills, focusing on rapid
                    comprehension and application. Our Fast Learning course
                    leverages advanced teaching methodologies, harnessing the
                    power of immersive simulations, interactive modules, and
                    real-world scenarios to expedite your learning journey. From
                    mastering complex maneuvers to swiftly adapting to diverse
                    road conditions, every aspect of the course is meticulously
                    tailored for accelerated comprehension. Engage in hands-on
                    practice sessions using our state-of-the-art training
                    facilities and modern fleet of vehicles, ensuring a seamless
                    and efficient learning process. Flexibility is key, and our
                    Fast Learning course offers adaptable scheduling options,
                    allowing you to tailor the program to fit your busy
                    lifestyle. Whether you're a quick learner looking to
                    fast-track your driving education or someone with time
                    constraints seeking an efficient yet thorough experience,
                    this course is structured to cater to diverse learning
                    needs. Embark on a journey of rapid learning where each
                    session propels you closer to driving proficiency. Our Fast
                    Learning course is not just about speed; it's about
                    precision, retention, and ensuring you grasp the
                    fundamentals without compromise. Transform your aspirations
                    into driving capabilities with a course that aligns with
                    your pace and maximizes your potential on the road.
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

export default LearningModal;

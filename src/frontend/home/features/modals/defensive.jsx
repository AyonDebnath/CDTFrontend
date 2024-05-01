function DefensiveModal() {
  return (
    <div
      className=" modal modal-home fade"
      id="defensiveModal"
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
                    <i className="icofont icofont-ambulance-cross"></i>
                  </p>
                  <div className="modal-course">
                    <h2 className="text-center pb-10 modal-course-title">
                      Defensive Driving
                    </h2>
                  </div>
                  <p className="text-justify">
                    Elevate your driving skills to new heights through our
                    meticulously crafted Defensive Driving course. Designed to
                    instill a proactive and safety-centric approach, this
                    program empowers you to navigate the road with confidence
                    and resilience. Led by our certified instructors, the course
                    encompasses a multifaceted curriculum that delves into the
                    psychology of driving, risk assessment, and advanced vehicle
                    handling techniques. Immerse yourself in a dynamic learning
                    environment that blends theoretical knowledge with practical
                    application. From mastering evasive maneuvers to
                    understanding the intricacies of defensive positioning, our
                    course equips you with the tools needed to anticipate and
                    respond effectively to potential hazards. Explore the
                    nuances of defensive driving strategies, including safe
                    following distances, proper use of mirrors, and anticipating
                    the actions of other road users. Engage in interactive
                    simulations and real-world scenarios, allowing you to hone
                    your decision-making skills in a controlled setting. Our
                    state-of-the-art training facilities and modern fleet of
                    vehicles provide a conducive atmosphere for hands-on
                    learning. Benefit from personalized coaching and
                    constructive feedback, ensuring that you not only grasp the
                    theoretical aspects but also develop the muscle memory
                    required for quick and precise defensive actions.
                    Flexibility is key, and our Defensive Driving course offers
                    convenient scheduling options to accommodate your busy
                    lifestyle. Whether you are a seasoned driver looking to
                    refresh your skills or a new driver eager to embrace a
                    safety-first mindset, our course is tailored to cater to all
                    experience levels. Join us in mastering the art of defensive
                    driving — where awareness, preparation, and proactive
                    decision-making converge to make you a confident and
                    responsible driver on any road. Your safety is our priority,
                    and this course is your gateway to a lifetime of secure and
                    enjoyable journeys.
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

export default DefensiveModal;

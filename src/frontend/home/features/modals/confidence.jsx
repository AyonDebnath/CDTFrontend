function ConfidenceModal() {
  return (
    <div
      className=" modal modal-home fade"
      id="confidenceModal"
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
                    <i className="icofont icofont-fast-delivery"></i>
                  </p>
                  <div className="modal-course">
                    <h2 className="text-center pb-10 modal-course-title">
                      Confidence Booster
                    </h2>
                  </div>
                  <p className="text-justify">
                    Unleash your full driving potential with our bespoke
                    Confidence Booster course, meticulously curated to elevate
                    your self-assurance behind the wheel. Led by our experienced
                    instructors, this transformative program is crafted to
                    empower drivers at all skill levels. Engage in a holistic
                    curriculum that not only imparts essential driving
                    techniques but also focuses on enhancing your mental
                    resilience and building a positive driving mindset. Explore
                    a range of confidence-building exercises, from conquering
                    challenging terrains to conquering peak traffic situations.
                    Through personalized coaching and hands-on experience,
                    you'll develop the poise and composure needed to navigate
                    any driving scenario with ease. Our state-of-the-art
                    training facilities provide a dynamic learning environment,
                    ensuring that each session is tailored to address individual
                    needs. The Confidence Booster course goes beyond traditional
                    driving education, incorporating elements of mindfulness and
                    stress management to foster a calm and collected demeanor on
                    the road. Benefit from immersive simulations that replicate
                    real-world challenges, allowing you to practice
                    decision-making and boost your confidence in a controlled
                    setting. Our commitment to your success extends to flexible
                    scheduling options, accommodating your busy lifestyle.
                    Whether you're a new driver seeking to build a strong
                    foundation or an experienced driver looking to overcome
                    specific challenges, this course is designed to instill the
                    skills and mindset needed for a lifetime of confident
                    driving. Join us on a journey of self-discovery and
                    empowerment, where every session is a step toward unlocking
                    your innate driving confidence. Transform uncertainties into
                    strengths and embrace the road with newfound assurance —
                    because confidence is not just taught; it's cultivated, and
                    our Confidence Booster course is the catalyst for your
                    driving self-discovery.
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

export default ConfidenceModal;

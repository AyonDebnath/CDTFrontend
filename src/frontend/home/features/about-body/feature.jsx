function Feature() {
  return (
    <div id="feature-area" className="feature-area bg-gray pt-90 pb-90">
      <div className="container">
        {/* <!-- Section Title --> */}
        <div className="row">
          <div className="section-title text-center col-12 mb-45">
            <h3 className="heading">Why Us?</h3>
            <div className="excerpt">
              <p>Discover why you should put your confidence in us</p>
            </div>
            <i className="icofont icofont-traffic-light"></i>
          </div>
        </div>
        <div className="row">
          {/* <!-- Left Feature --> */}
          <div className="feature-wrapper feature-left text-right col-lg-4 col-12">
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-file-spreadsheet"></i>
              </div>
              <div className="text fix">
                <h4>Quick License</h4>
                <p>
                  Fastest way to achieve your driving goals in the shortest
                  possible time.
                </p>
              </div>
            </div>
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-car-alt-4"></i>
              </div>
              <div className="text fix">
                <h4>Unlimited Car Support</h4>
                <p>
                  We are here with you for every car needs from the first lesson
                  to road test
                </p>
              </div>
            </div>
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-video-alt"></i>
              </div>
              <div className="text fix">
                <h4>Video classNamees</h4>
                <p>
                  We will be soon coming out with video lessons for your
                  comprehension.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Feature Image --> */}
          <div className="feature-image text-center col-lg-4 col-12">
            <img src="/frontend/img/feature.png" alt="feature" />
          </div>
          {/* <!-- Right Feature --> */}
          <div className="feature-wrapper feature-right col-lg-4 col-12">
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-man-in-glasses"></i>
              </div>
              <div className="text fix">
                <h4>Experienced Instructor</h4>
                <p>
                  Our instructor has had a long and successful career with
                  countless success stories.
                </p>
              </div>
            </div>
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-clock-time"></i>
              </div>
              <div className="text fix">
                <h4>Any Time Any Place</h4>
                <p>
                  You don't need to come to us, we will come to you for pick-up
                  and drop off for every lesson.
                </p>
              </div>
            </div>
            <div className="single-feature">
              <div className="icon">
                <i className="icofont icofont-direction-sign"></i>
              </div>
              <div className="text fix">
                <h4>Learning Roads</h4>
                <p>
                  Learn the roads and adverse situations through-out St. John's
                  for gaining confidence on the road.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;

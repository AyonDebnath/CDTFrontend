import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

import Assessment from "../../elements/form-elements/assessment";
import AssessmentText from "../home-body/assessmentText";

function HeroSlide() {
  return (
    <div id="hero-area" className="hero-slider-area">
      <div id="hero-slider" className="slider-image">
        <Swiper
          modules={[Pagination, EffectFade]}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          effect="fade"
        >
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <img
                    src="/frontend/img/slider/bg-1.jpg"
                    alt="main slider"
                    style={{
                      filter: "brightness(0.5)",
                      margin_left: "1rem",
                    }}
                  />
                  <div
                    id="htmlcaption1"
                    style={{
                      position: "absolute",
                      zIndex: "99",
                      top: "10rem",
                    }}
                    className=""
                  >
                    <div className="slide-table container">
                      <div className="table-cell">
                        <div className="hero-slide-content float-right right-text text-right">
                          <h3>welcome to Confident Driver Training</h3>
                          <h1>
                            the best
                            <span> driving </span>
                            Lessons
                          </h1>
                          <p>
                            Confident Drivers Training provides you with the
                            best opportunities that will
                            <br />
                            help in fulfilling your driving needs.{" "}
                          </p>
                          <div className="button-group">
                            <Link
                              to="/sign-in"
                              className="btn transparent book-btn"
                            >
                              book lesson
                            </Link>
                            <Link to="/about" className="btn color">
                              learn more
                            </Link>
                          </div>
                        </div>
                        <div className="find-course-form float-left text-left">
                          <h5>
                            <span>
                              Book an <AssessmentText />
                            </span>
                            <i className="icofont icofont-police-car"></i>
                          </h5>
                          <Assessment />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                "nothing"
              )
            }
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <img
                    src="/frontend/img/slider/bg-2.jpg"
                    alt="main slider"
                    style={{
                      filter: "brightness(0.5)",
                      margin_left: "1rem",
                    }}
                  />
                  <div
                    id="htmlcaption1"
                    style={{
                      position: "absolute",
                      zIndex: "99",
                      top: "10rem",
                    }}
                    className=""
                  >
                    <div className="slide-table container">
                      <div className="table-cell">
                        <div className="hero-slide-content float-left left-text text-left">
                          <h3>welcome to Confident Driver Training</h3>
                          <h1>
                            the most
                            <span> affordable </span>
                            Lessons
                          </h1>
                          <p>
                            Confident Drivers Training provides you with the
                            best opportunities that will
                            <br />
                            help in fulfilling your driving needs.{" "}
                          </p>
                          <div className="button-group">
                            <Link
                              to="/sign-in"
                              className="btn transparent book-btn"
                            >
                              book lesson
                            </Link>
                            <Link href="/about" className="btn color">
                              learn more
                            </Link>
                          </div>
                        </div>
                        <div className="find-course-form float-right text-left">
                          <h5>
                            <span>
                              Book an <AssessmentText />{" "}
                            </span>
                            <i className="icofont icofont-police-car"></i>
                          </h5>
                          <Assessment />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                "nothing"
              )
            }
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <img
                    src="/frontend/img/slider/bg-3.jpg"
                    alt="main slider"
                    style={{
                      filter: "brightness(0.5)",
                      margin_left: "1rem",
                    }}
                  />
                  <div
                    id="htmlcaption1"
                    style={{
                      position: "absolute",
                      zIndex: "99",
                      top: "10rem",
                    }}
                    className=""
                  >
                    <div className="slide-table container solo-table">
                      <div className="table-cell">
                        <div className="hero-slide-content text-center">
                          <h3>welcome to Confident Driver Training</h3>
                          <h1>
                            the best
                            <span> driving</span>
                            Lessons
                          </h1>
                          <p>
                            Confident Drivers Training provides you with the
                            best opportunities that will
                            <br />
                            help in fulfilling your driving needs.{" "}
                          </p>
                          <div className="button-group">
                            <a href="sign-in.html" className="btn transparent">
                              book lesson
                            </a>
                            <a href="about.html" className="btn color">
                              learn more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null
            }
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSlide;

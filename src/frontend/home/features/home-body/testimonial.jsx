import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";

function Testimonial() {
  return (
    <div
      id="testimonial-area"
      className="testimonial-area overlay overlay-white overlay-80 text-center pt-90 pb-90"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            {/* <!-- Testimonial Image Slider --> */}
            <Swiper
              modules={[EffectFade, Navigation]}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".ts-next",
                prevEl: ".ts-prev",
                disabledClass: "swiper-button-disabled",
              }}
              effect="fade"
            >
              <SwiperSlide>
                <div className="ti-slider mb-40">
                  <div className="image fix">
                    <img src="/frontend/img/testimonial/1.jpg" alt="" />
                  </div>
                </div>
                <div className="ti-slider-text">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by hum domised words which is don't look believable.
                  </p>
                  <h5>momen bhuiyan</h5>
                  <span>Graphic Designer</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ti-slider mb-40">
                  <div className="image fix">
                    <img src="/frontend/img/testimonial/2.jpg" alt="" />
                  </div>
                </div>
                <div className="ti-slider-text">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by hum domised words which is don't look believable.
                  </p>
                  <h5>momen bhuiyan</h5>
                  <span>Graphic Designer</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ti-slider mb-40">
                  <div className="image fix">
                    <img src="/frontend/img/testimonial/3.jpg" alt="" />
                  </div>
                </div>
                <div className="ti-slider-text">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by hum domised words which is don't look believable.
                  </p>
                  <h5>momen bhuiyan</h5>
                  <span>Graphic Designer</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ti-slider mb-40">
                  <div className="image fix">
                    <img src="/frontend/img/testimonial/4.jpg" alt="" />
                  </div>
                </div>
                <div className="ti-slider-text">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by hum domised words which is don't look believable.
                  </p>
                  <h5>momen bhuiyan</h5>
                  <span>Graphic Designer</span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      {/* <!-- Slider Arrows --> */}
      <button className="ts-arrows ts-prev">
        <i className="icofont icofont-caret-left"></i>
      </button>
      <button className="ts-arrows ts-next">
        <i className="icofont icofont-caret-right"></i>
      </button>
    </div>
  );
}

export default Testimonial;

// Import Components
import HeroSlide from "../features/header/hero-slide";
import CTA2 from "../features/banner/calltoaction2";
import BookingModal from "../features/modals/booking";
import Course from "../features/home-body/course";
import NormalModal from "../features/modals/normal";
import DefensiveModal from "../features/modals/defensive";
import ConfidenceModal from "../features/modals/confidence";
import LearningModal from "../features/modals/learning";
import SuccessModal from "../features/modals/success";
import FunFact from "../features/home-body/fun-fact";
import CTA from "../features/banner/calltoaction";
import Video from "../features/home-body/video";
import Testimonial from "../features/home-body/testimonial";
import Pricing from "../features/home-body/pricing";
import FAQ from "../features/home-body/faq";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function Landing() {
  return (
    <>
      {/* <!-- Hero Slide Area
============================================ --> */}
      <HeroSlide />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA2 />
      {/* <!-- Course Area
    ============================================ --> */}
      <Course />
      {/* <!-- Funfact Area
============================================ --> */}
      <FunFact />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA />
      {/* <!-- Video Area
============================================ --> */}
      <Video />
      {/* <!-- Testimonial Area
============================================ --> */}
      <Testimonial />
      {/* <!-- Pricing Area
============================================ --> */}
      <Pricing />
      {/* <!-- FAQ Area
============================================ --> */}
      <FAQ />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA />

      {/* <!-- Booking Modal Area
============================================ --> */}
      <BookingModal />
      {/* <!-- Normal Modal Area
============================================ --> */}
      <NormalModal />
      {/* <!-- Defensive Modal Area
============================================ --> */}
      <DefensiveModal />
      {/* <!-- Confidence Modal Area
============================================ --> */}
      <ConfidenceModal />
      {/* <!-- Learning Modal Area
============================================ --> */}
      <LearningModal />
      {/* <!-- Success Modal Area
============================================ --> */}
      <SuccessModal />
    </>
  );
}

export default Landing;

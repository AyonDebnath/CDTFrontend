import CTA from "../features/banner/calltoaction";
import Header from "../features/header/header";
import Course from "../features/home-body/course";
import Pricing from "../features/home-body/pricing";
import BookingModal from "../features/modals/booking";
import ConfidenceModal from "../features/modals/confidence";
import DefensiveModal from "../features/modals/defensive";
import LearningModal from "../features/modals/learning";
import NormalModal from "../features/modals/normal";

function Service() {
  return (
    <>
      {/* <!-- Page Banner Area
============================================ --> */}
      <Header pageName="Services" />
      {/* <!-- Course Area
    ============================================ --> */}
      <Course />

      {/* <!-- Pricing Area
    ============================================ --> */}
      <Pricing />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA />
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
      {/* <!-- Booking Modal Area
============================================ --> */}
      <BookingModal />
    </>
  );
}

export default Service;

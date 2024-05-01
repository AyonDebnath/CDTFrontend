import SuccessModal from "../features/modals/success";
import BookingModal from "../features/modals/booking";
import CTA from "../features/banner/calltoaction";
import FAQ from "../features/home-body/faq";
import CTA2 from "../features/banner/calltoaction2";
import Header from "../features/header/header";
// import AboutBlog from "../features/about-body/about-blog";
import Feature from "../features/about-body/feature";
import HoverModal from "../features/about-body/about-blog";
function About() {
  return (
    <>
      {/* <!-- Page Banner Area
============================================ --> */}
      <Header pageName="About Us" />
      {/* <!-- About Area
============================================ --> */}
      <HoverModal />
      <CTA2 />
      {/* <!-- Booking Modal Area
    ============================================ --> */}
      <BookingModal />
      {/* <!-- Success Modal Area
    ============================================ --> */}
      <SuccessModal />
      {/* <!-- Feature Area
============================================ --> */}
      <Feature />

      {/* <!-- FAQ Area
============================================ --> */}
      <FAQ />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA />
    </>
  );
}

export default About;

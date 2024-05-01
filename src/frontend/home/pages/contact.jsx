import CTA from "../features/banner/calltoaction";
import ContactForm from "../features/contact/contact-form";
import Header from "../features/header/header";

function Contact() {
  return (
    <>
      {/* <!-- Page Banner Area
============================================ --> */}
      <Header pageName="Contact Us" />
      {/* <!-- Contatc Area
============================================ --> */}
      <ContactForm />
      {/* <!-- CTA Area
============================================ --> */}
      <CTA />
    </>
  );
}

export default Contact;

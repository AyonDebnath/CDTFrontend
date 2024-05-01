import { Link } from "react-router-dom";
import Input from "../../elements/form-elements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import useForm from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import SuccessRequest from "../../features/modals/successRequest";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

function ContactForm() {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      subject: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError, isSuccess, setIsSucess } =
    useHttpClient();

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/contact`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          subject: formState.inputs.subject.value,
          message: formState.inputs.message.value,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.log(err);
    }
  }

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  function successHandler() {
    setIsSucess(false);
    window.location.reload();
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <SuccessRequest isSuccess={isSuccess} onClear={successHandler} />
      {isLoading && (
        <FadeLoader
          cssOverride={{
            height: "100%",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: "2000",
          }}
          color="#f43e18"
        />
      )}
      <div id="contact-area" className="contact-area bg-gray">
        <div className="container pb-90 pt-90">
          {/* <!-- Section Title --> */}
          <div className="row">
            <div className="section-title text-center col-12 mb-45">
              <h3 className="heading">Contact us</h3>
              <div className="excerpt">
                <p>Send us your thoughts, we would love to hear from you.</p>
              </div>
              <i className="icofont icofont-traffic-light"></i>
            </div>
          </div>
          <div className="row">
            {/* <!-- Contact Info --> */}
            <div className="contact-info col-lg-4 col-sm-5 col-12">
              <div className="single-info text-left fix">
                <div className="icon">
                  <i className="icofont icofont-phone"></i>
                </div>
                <div className="content fix">
                  <h5>call us</h5>
                  <p>
                    + 1 432 789 5647 <br />+ 1 432 789 5673
                  </p>
                </div>
              </div>
              <div className="single-info text-left fix">
                <div className="icon">
                  <i className="icofont icofont-envelope"></i>
                </div>
                <div className="content fix">
                  <h5>your message</h5>
                  <p>
                    <Link to="/contact">info@alfresco.com</Link>
                    <Link href="/contact">admin@alfresco.com</Link>
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Contact Form --> */}
            <div className="contact-form form text-left col-lg-8 col-sm-7 col-12">
              <form id="contact-form" onSubmit={submitHandler}>
                <div className="input-2">
                  <div className="input">
                    <Input
                      id="name"
                      onInput={inputHandler}
                      elem="input"
                      type="text"
                      placeholder="Your Name"
                      errorText="Please Enter a Valid Name"
                      validator={[VALIDATOR_REQUIRE()]}
                    />
                  </div>
                  <div className="input">
                    <Input
                      id="email"
                      onInput={inputHandler}
                      elem="input"
                      type="text"
                      placeholder="Your Email"
                      errorText="Please Enter a Valid Email"
                      validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    />
                  </div>
                </div>
                <div className="input">
                  <Input
                    id="subject"
                    onInput={inputHandler}
                    elem="input"
                    type="text"
                    placeholder="Subject of The Message"
                    errorText="Please Enter a Valid Subject"
                    validator={[VALIDATOR_REQUIRE()]}
                  />
                </div>
                <div className="input textarea">
                  <Input
                    id="message"
                    onInput={inputHandler}
                    placeholder="Message"
                    errorText="Please Enter a Valid Message"
                    validator={[VALIDATOR_REQUIRE()]}
                  />
                </div>
                <div className="input input-submit">
                  <button
                    type="submit"
                    className="btn color "
                    disabled={!formState.isValid}
                  >
                    Send
                  </button>
                </div>
              </form>
              <p className="form-messege"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;

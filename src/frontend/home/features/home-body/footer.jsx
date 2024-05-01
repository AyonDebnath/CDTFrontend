import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../../elements/form-elements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import useForm from "../../../shared/hooks/form-hook";
import SuccessRequest from "../../features/modals/successRequest";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { useHttpClient } from "../../../shared/hooks/http-hook";

function Footer() {
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
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          message: formState.inputs.message.value,
        })
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
      <div className="footer-area overlay overlay-black overlay-70 pt-90">
        <Container className="container">
          <Row>
            <Col lg="8" className="footer-top text-center mb-80 col-12 mx-auto">
              <img src="/frontend/img/logo.png" className="footer-img" alt="" />
              <p>
                Why compromise between price, quality and flexibility choose CDT
                and get the best of all worlds. Learn to be the most confident
                driver on the road.{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="3" className="footer-widget col-md-6 col-12">
              <h4 className="widget-title">about CDT</h4>
              <div className="about-widget">
                <p>
                  We provide the cheapest and best service from a driving
                  school.
                </p>
                <div className="widget-social fix">
                  <a href="#">
                    <i className="icofont icofont-social-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="icofont icofont-social-pinterest"></i>
                  </a>
                  <a href="#">
                    <i className="icofont icofont-social-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="icofont icofont-social-rss"></i>
                  </a>
                </div>
              </div>
            </Col>
            <Col lg="3" className="footer-widget col-md-6 col-12">
              <h4 className="widget-title">quick contact</h4>
              <div className="contact-widget">
                <h5>phone:</h5>
                <p>
                  +880 1912 345 678
                  <br />
                  +880 1912 345 678
                </p>
                <h5>e-mail</h5>
                <p>
                  <a href="#">driveonskill@email.com</a>
                  <a href="#">www.driveon.com</a>
                </p>
              </div>
            </Col>
            <Col lg="3" className="footer-widget col-md-6 col-12">
              <h4 className="widget-title">GET IN TOUCH</h4>
              <div className="form-widget">
                <form onSubmit={submitHandler}>
                  <Input
                    id="name"
                    onInput={inputHandler}
                    elem="input"
                    type="text"
                    placeholder="Name"
                    validator={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter a Valid Name"
                  />
                  <Input
                    id="email"
                    onInput={inputHandler}
                    elem="input"
                    type="text"
                    placeholder="email"
                    validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Please Enter a Valid Email"
                  />
                  <Input
                    id="message"
                    onInput={inputHandler}
                    type="text"
                    placeholder="Your Message"
                    validator={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter a Valid Message"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm color"
                    disabled={!formState.isValid}
                  >
                    Send
                  </button>
                </form>
              </div>
            </Col>
            <Col lg="3" className="footer-widget col-md-6 col-12">
              <h4 className="widget-title">Opening Hour</h4>
              <div className="opening-hour-widget">
                <ul>
                  <li>
                    <span className="float-left">Monday</span>
                    <span className="float-right">06:00-16:00</span>
                  </li>
                  <li>
                    <span className="float-left">Tuesday</span>
                    <span className="float-right">06:00-16:00</span>
                  </li>
                  <li>
                    <span className="float-left">Wednesday</span>
                    <span className="float-right">Closed</span>
                  </li>
                  <li>
                    <span className="float-left">Thursday</span>
                    <span className="float-right">06:00-16:00</span>
                  </li>
                  <li>
                    <span className="float-left">Friday</span>
                    <span className="float-right">06:00-16:00</span>
                  </li>
                  <li>
                    <span className="float-left">Saturday</span>
                    <span className="float-right">06:00-16:00</span>
                  </li>
                  <li>
                    <span className="float-left">Sunday</span>
                    <span className="float-right">Closed</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom text-center col-12">
            <p className="copyright">
              Copyright &copy;{" "}
              <a href="https://shaswataweb.netlify.app/"> Shaswata Web </a>
              ALL Right Reserved
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Footer;

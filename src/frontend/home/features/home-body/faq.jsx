import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";

function FAQ() {
  const [panel, setPanel] = useState("panel1");

  return (
    <div id="faq-area" className="faq-area bg-white pt-90 pb-60">
      <div className="container">
        {/* <!-- Section Title --> */}
        <div className="row">
          <div className="section-title text-center col-12 mb-45">
            <h3 className="heading">Frequently asked questions</h3>
            <div className="excerpt">
              <p>
                Learn more about the most frequently asked question from our
                students
              </p>
            </div>
            <i className="icofont icofont-traffic-light"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="panel-group">
              <Accordion className="panel panel-default" defaultExpanded>
                <AccordionSummary
                  className="panel-heading"
                  onClick={() =>
                    panel === "panel1" ? setPanel("panel") : setPanel("panel1")
                  }
                >
                  <h4 className="panel-title">
                    <a
                      className={`${panel == "panel1" ? "active-a" : ""}`}
                      href={void 0}
                    >
                      Do you provide vehicle for the driving test?
                    </a>
                  </h4>
                </AccordionSummary>
                <AccordionDetails className="panel-collapse collapse show">
                  <div className="panel-body">
                    <p>
                      Yes, we do. Our Road Test Package includes parking and
                      driving assessment as well as the car for the Road Test.
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="panel panel-default">
                <AccordionSummary
                  className="panel-heading"
                  onClick={() =>
                    panel === "panel2" ? setPanel("panel") : setPanel("panel2")
                  }
                >
                  <h4 className="panel-title">
                    <a
                      className={`${panel == "panel2" ? "active-a" : ""}`}
                      href={void 0}
                    >
                      Do you provide vehicle for the driving test?
                    </a>
                  </h4>
                </AccordionSummary>
                <AccordionDetails className="panel-collapse collapse show">
                  <div className="panel-body">
                    <p>
                      Yes, we do. Our Road Test Package includes parking and
                      driving assessment as well as the car for the Road Test.
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="panel panel-default">
                <AccordionSummary
                  className="panel-heading"
                  onClick={() =>
                    panel === "panel3" ? setPanel("panel") : setPanel("panel3")
                  }
                >
                  <h4 className="panel-title">
                    <a
                      href={void 0}
                      className={`${panel == "panel3" ? "active-a" : ""}`}
                    >
                      Do you provide vehicle for the driving test?
                    </a>
                  </h4>
                </AccordionSummary>
                <AccordionDetails className="panel-collapse collapse show">
                  <div className="panel-body">
                    <p>
                      Yes, we do. Our Road Test Package includes parking and
                      driving assessment as well as the car for the Road Test.
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="panel panel-default">
                <AccordionSummary
                  className="panel-heading"
                  onClick={() =>
                    panel === "panel4" ? setPanel("panel") : setPanel("panel4")
                  }
                >
                  <h4 className="panel-title">
                    <a
                      className={`${panel == "panel4" ? "active-a" : ""}`}
                      href={void 0}
                    >
                      Do you provide vehicle for the driving test?
                    </a>
                  </h4>
                </AccordionSummary>
                <AccordionDetails className="panel-collapse collapse show">
                  <div className="panel-body">
                    <p>
                      Yes, we do. Our Road Test Package includes parking and
                      driving assessment as well as the car for the Road Test.
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="faq-image col-lg-6 col-12">
            <img src="/frontend/img/Camry.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

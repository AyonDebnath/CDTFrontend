import CountUp from "react-countup";

function FunFact() {
  return (
    <div className="funfact-area overlay overlay-white overlay-80 pt-90 pb-60">
      <div className="container">
        <div className="row">
          <div className="single-facts text-center col-md-3 col-sm-6 col-12 mb-30">
            <i className="icofont icofont-hat-alt"></i>
            <CountUp start={0} end={6500} duration={5}>
              {({ countUpRef }) => (
                <h1 className="counter plus" ref={countUpRef}></h1>
              )}
            </CountUp>
            <p>graduted from here</p>
          </div>
          <div className="single-facts text-center col-md-3 col-sm-6 col-12 mb-30">
            <i className="icofont icofont-user-suited"></i>
            <CountUp start={0} end={56} duration={5}>
              {({ countUpRef }) => (
                <h1 className="counter" ref={countUpRef}></h1>
              )}
            </CountUp>
            <p>teachers number</p>
          </div>
          <div className="single-facts text-center col-md-3 col-sm-6 col-12 mb-30">
            <i className="icofont icofont-history"></i>
            <CountUp start={0} end={11} duration={5}>
              {({ countUpRef }) => (
                <h1 className="counter" ref={countUpRef}></h1>
              )}
            </CountUp>
            <p>years on market</p>
          </div>
          <div className="single-facts text-center col-md-3 col-sm-6 col-12 mb-30">
            <i className="icofont icofont-users-social"></i>
            <CountUp start={0} end={550} duration={5}>
              {({ countUpRef }) => (
                <h1 className="counter" ref={countUpRef}></h1>
              )}
            </CountUp>
            <p>present students</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunFact;

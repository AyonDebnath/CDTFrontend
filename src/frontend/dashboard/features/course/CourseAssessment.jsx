export default function CourseAssessment() {
  return (
    <div className="col-lg-6">
      <div className="card card-success">
        <div className="card-body">
          <h4 className="card-text text-white text-center mt-2">
            <span className="fw-medium">Your Assessment</span> is ready
          </h4>
          <p className="text-white text-center mt-4">
            After your assessment we have carefully selected a course that best
            fits your needs.
          </p>
          <p className="text-white text-center mt-4">
            View your detailed assessment to better understand your course
          </p>
        </div>
        <div className="card-footer">
          <div className="text-center">
            <a
              data-bs-toggle="modal"
              data-bs-target="#scoreModal"
              type="button"
              className="link-light"
            >
              View Assessment{" "}
              <i className="ri-arrow-right-s-line align-middle lh-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

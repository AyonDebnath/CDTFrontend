export default function PreferredPackage() {
  return (
    <div className="col-lg-6">
      <div className="card pricing-box card-warning ribbon-box ribbon-fill text-center">
        <div className="ribbon ribbon-success">New</div>
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="card-body h-100">
              <div>
                <h5 className="mb-1 text-white">Most Popular</h5>
              </div>

              <div className="py-4">
                <h2 className="text-white">
                  <sup>
                    <small>$</small>
                  </sup>
                  280 <span className="fs-13 text-white">/Total</span>
                </h2>
              </div>

              <div className="text-center plan-btn mt-2">
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#planModal"
                  className="btn btn-soft-warning w-sm waves-effect waves-light"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
          {/* <!--end col--> */}
          <div className="col-lg-6">
            <div className="card-body border-start mt-4 mt-lg-0">
              <div className="card-header bg-warning-subtle">
                <h5 className="fs-15 mb-0 text-warning">Plan Features:</h5>
              </div>
              <div className="card-body pb-0">
                <ul className="list-unstyled vstack gap-3 mb-0">
                  <li>
                    classNamees:{" "}
                    <span className="text-white fw-semibold">3</span>
                  </li>
                  <li>
                    Duration:{" "}
                    <span className="text-white fw-semibold">3 Hours</span>
                  </li>
                  <li>
                    Car: <span className="text-white fw-semibold">Yes</span>
                  </li>
                  <li>
                    Assessment:{" "}
                    <span className="text-white fw-semibold">Yes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!--end col--> */}
        </div>
        {/* <!--end row--> */}
      </div>
    </div>
  );
}

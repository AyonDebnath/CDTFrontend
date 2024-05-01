import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PageTitle({ pageName }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
          <h4 className="mb-sm-0">{pageName}</h4>

          {pageName === "Dashboard" ? (
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">{pageName}</li>
              </ol>
            </div>
          ) : (
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/user-dashboard">Dashboards</Link>
                </li>
                <li className="breadcrumb-item active">{pageName}</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  pageName: PropTypes.string,
};

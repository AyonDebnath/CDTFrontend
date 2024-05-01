import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ pageName }) {
  return (
    <div className="page-banner-area overlay overlay-black overlay-70">
      <div className="container">
        <div className="row">
          <div className="page-banner text-center col-12">
            <h1>{pageName}</h1>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <span>{pageName}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
};

export default Header;

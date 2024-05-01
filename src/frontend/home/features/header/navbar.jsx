import { Fade } from "reactstrap";
import { Twirl as Hamburger } from "hamburger-react";
import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

function Navbar() {
  const [stickyClass, setStickyClass] = useState(" ");
  const [visi, setVisi] = useState(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };

  return (
    <div className="header-area header-absolute header-transparent">
      <div className="small-header header-bottom sticky">
        <div className="container">
          <div className="row justify-content-between">
            <div className="navbar-header col-auto">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-4">
                    <Link to="/" className="logo-home navbar-brand">
                      <img
                        className="logo-img-smll"
                        src="/frontend/img/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div
                    className="col-4 light"
                    onClick={() => {
                      setVisi(!visi);
                    }}
                  >
                    <Hamburger />
                  </div>
                </div>
              </div>
            </div>
            <Fade in={visi} timeout={200}>
              <div
                className={`main-menu col-auto ${
                  visi ? "visible-menu" : "non-visible-menu"
                }`}
              >
                <nav>
                  <ul>
                    <li>
                      <NavLink to="/">home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/about">about</NavLink>
                    </li>
                    {/* <!--							<li><a href="gallery.html">gallery</a>-->
    <!--							</li>--> */}
                    <li>
                      <NavLink to="/services">services</NavLink>
                    </li>
                    {/* <!--							<li><a href="blog.html">blog</a>-->
                            </li> */}
                    <li>
                      <NavLink to="/contact">contact</NavLink>
                    </li>
                    {!auth.isLoggedIn && (
                      <li>
                        <NavLink to="/sign-in">
                          sign-in<i className="icofont icofont-user"></i>
                        </NavLink>
                      </li>
                    )}
                    {auth.isLoggedIn && (
                      <li>
                        <NavLink to={`/user-dashboard/${auth.userId}`}>
                          Dashboard<i className="icofont icofont-user"></i>
                        </NavLink>
                      </li>
                    )}
                    {auth.isLoggedIn && (
                      <li
                        onClick={() => {
                          auth.logout();
                        }}
                      >
                        <NavLink to="/sign-in">
                          logout<i className="icofont icofont-logout"></i>
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="header-top d-none d-md-block">
        <div className="container">
          {/* <!-- Header Top --> */}
          <div className="header-top-wrapper row">
            <div className="header-top-left text-left col-md-6 col-12">
              <p>
                <i className="icofont icofont-ui-call"></i>
                <span>+1-709-764-9845</span>
              </p>
            </div>
            <div className="header-top-right text-right col-md-6 col-12">
              <p>
                <i className="icofont icofont-clock-time"></i>
                <span>Mon - Tue : 6am - 4pm</span>
              </p>
              <p>
                <i className="icofont icofont-clock-time"></i>
                <span>Thu - Sat : 6am - 4pm</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${stickyClass} large-header header-bottom sticky`}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="navbar-header col-4">
              <Link to="/" className="logo-home navbar-brand">
                <img
                  className="logo-img"
                  src="/frontend/img/logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="main-menu mean-menu col-auto">
              <nav>
                <ul>
                  <li>
                    <NavLink to="/">home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">about</NavLink>
                  </li>
                  {/* <!--							<li><a href="gallery.html">gallery</a>-->
    <!--							</li>--> */}
                  <li>
                    <NavLink to="/services">services</NavLink>
                  </li>
                  {/* <!--							<li><a href="blog.html">blog</a>-->
                            </li> */}
                  <li>
                    <NavLink to="/contact">contact</NavLink>
                  </li>
                  {!auth.isLoggedIn && (
                    <li>
                      <NavLink to="/sign-in">
                        sign-in<i className="icofont icofont-user"></i>
                      </NavLink>
                    </li>
                  )}

                  {auth.isLoggedIn && (
                    <li>
                      <NavLink to={`/user-dashboard/${auth.userId}`}>
                        Dashboard<i className="icofont icofont-user"></i>
                      </NavLink>
                    </li>
                  )}

                  {auth.isLoggedIn && (
                    <li
                      onClick={() => {
                        auth.logout();
                      }}
                    >
                      <NavLink to="/">
                        logout<i className="icofont icofont-logout"></i>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

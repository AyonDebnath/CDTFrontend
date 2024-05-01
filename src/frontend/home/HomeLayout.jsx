import { Outlet } from "react-router-dom";
import Navbar from "./features/header/navbar";
import Footer from "./features/home-body/footer";

import "./style.css";
import "./styling/icofont.css";
import "./styling/plugins.css";
import "./styling/shortcode/shortcodes.css";
import "./styling/responsive.css";
import "./styling/style-customizer.css";
import "./styling/fonts/lato/lato.css";

function HomeLayout() {
  return (
    <div className="wrapper fix">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;

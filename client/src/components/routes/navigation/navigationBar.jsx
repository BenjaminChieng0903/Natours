import { Outlet } from "react-router-dom";
import Footer from "../../footer/footer";
import "./navigationbar.scss";
// import "./../../css/styles.css";
const NavigationBar = () => {
  return (
    // <body className="container">
    <div>
      <header className="navheader">
        <div className="navigation nav--tours">
          <a href="#" className="nav__el">
            All tours
          </a>
        </div>
        {/* <form className="nav__search">
            <button className="nav__search-btn">
              <svg>
                <use href="img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search tours"
              className="nav__search-input"
            />
          </form>
        // </nav> */}
        <div className="header__logo">
          <img src="img/logo-white.png" alt="Natours logo" />
        </div>
        <div className="navigtion nav--user">
          {/* <a href="#" className="nav__el">
            My bookings
          </a>
          <a href="#" className="nav__el">
            <img src="img/user.jpg" alt="User photo" className="nav__user-img" />
            <span>Jonas</span>
          </a> */}

          <button className="nav__el">Log in</button>
          <button className="nav__el nav__el--cta">Sign up</button>
        </div>
      </header>
      <Outlet />

      <Footer />
    </div>
  );
};

export default NavigationBar;

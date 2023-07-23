import { Outlet } from "react-router-dom";
import Footer from "../../footer/footer";
import "./navigationbar.scss";
const NavigationBar = () => {
  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <a href="#" className="nav__el">
            All tours
          </a>
          <form className="nav__search">
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
        </nav>
        <div className="header__logo">
          <img src="img/logo-white.png" alt="Natours logo" />
        </div>
      </header>
      <Outlet />

      <Footer />
    </>
  );
};

export default NavigationBar;

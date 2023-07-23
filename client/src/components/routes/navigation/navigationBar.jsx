import { Outlet } from "react-router-dom";
import Footer from "../../footer/footer";
const NavigationBar = () => {
  return (
    <>
      <header class="header">
        <nav class="nav nav--tours">
          <a href="#" class="nav__el">
            All tours
          </a>
          <form class="nav__search">
            <button class="nav__search-btn">
              <svg>
                <use href="img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search tours"
              class="nav__search-input"
            />
          </form>
        </nav>
        <div class="header__logo">
          <img src="img/logo-white.png" alt="Natours logo" />
        </div>
      </header>
      <Outlet />

      <Footer />
    </>
  );
};

export default NavigationBar;

import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../footer/footer";
import "./navigationbar.scss";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "../../store/user/user.selector";
// import "./../../css/styles.css";
const NavigationBar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectorCurrentUser);
  const { name, photo } = currentUser;
  const photoUrl = `img/users/${photo}`;
  return (
    // <body className="container">
    <div>
      <header className="navheader">
        <div className="navigation nav--tours">
          <a href="/" className="nav__el">
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
          {!currentUser ? (
            <>
              <button className="nav__el" onClick={() => navigate("/login")}>
                Log in
              </button>

              <button
                className="nav__el nav__el--cta"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <button className="nav__el">Log out</button>
              <a
                onClick={() =>
                  console.log("this will redirect to account page")
                }
                class="nav__el"
              >
                <img src={photoUrl} alt={name} class="nav__user-img" />
                <span>{name}</span>
              </a>
            </>
          )}
        </div>
      </header>
      <Outlet />

      <Footer />
    </div>
  );
};

export default NavigationBar;

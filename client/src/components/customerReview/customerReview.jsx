import { useSelector } from "react-redux";
import "./customerReview.css";
import { selectorBookingsReview } from "../store/booking/booking.selector";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { selectorCurrentUser } from "../store/user/user.selector";
import AxiosApi from "../../axiosApi/api";
import { useNavigate } from "react-router-dom";

const CustomerReview = () => {
  const labels = {
    0.5: "Very Useless",
    1: "Useless",
    1.5: " Very Poor",
    2: "Poor",
    2.5: "Ok",
    3: "Very Ok",
    3.5: "Good",
    4: "Very Good",
    4.5: "Excellent",
    5: "Very Excellent",
  };
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const tour = useSelector(selectorBookingsReview);
  const currentUser = useSelector(selectorCurrentUser);
  const [text, setText] = useState(null);
  const navigate = useNavigate();
  const imageUrl = `/img/tours/${tour.imageCover}`;
  const convertDateFormat = () => {
    const dateObject = new Date(tour.startDates[0]);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = dateObject.toLocaleString("en-AU", options);
    // console.log(formattedDate);
    return formattedDate;
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  return (
    <main className="main">
      <div className="customer-review">
        <div className="customer-review__header">
          <div className="card__picture">
            <div className="card__picture-overlay">&nbsp;</div>
            <img src={imageUrl} alt={tour.name} className="card__picture-img" />
          </div>
          <div className="title-container">
            <h2 className="font-heading ma-bt-md">Review for {tour.name}</h2>
          </div>
        </div>
        <div className="customer-review__body">
          <div className="tour-infomation">
            {/* <div className="overview-box__group">
              <div className="description-box">
                <h2 className="heading-secondary ma-bt-lg">About</h2>
                <p className="description__text">{tour.summary}</p>
              </div>
            </div> */}
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your Tour Info</h2>
              <div className="overview-box__detail">
                <svg className="card__icon">
                  <use href="/img/icons.svg#icon-flag"></use>
                </svg>
                <span className="overview-box__label">Stops</span>
                <span style={{ fontWeight: "bold" }}>
                  {tour.locations.length} stops
                </span>
              </div>
              <div className="overview-box__detail">
                {/* <svg className="card__icon">
                  <use href="/img/icons.svg#icon-flag"></use>
                </svg>
                <span className="overview-box__label">Stops</span> */}
                {tour.locations.map((stop) => {
                  return (
                    <span style={{ fontWeight: "bold" }}>
                      day {stop.day}: {stop.description}
                    </span>
                  );
                })}
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="overview-box__label">Your date</span>
                <span className="overview-box__text">
                  {convertDateFormat()}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{tour.difficulty}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-user"></use>
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{tour.maxGroupSize}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">
                  {tour.ratingsAverage} / 5
                </span>
              </div>
            </div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => {
                return (
                  <div className="overview-box__detail">
                    <img
                      src={`/img/users/${guide.photo}`}
                      alt={guide.role}
                      className="overview-box__img"
                    />
                    <span className="overview-box__label">{guide.role}</span>
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="customer-review-section">
            <h2 className="heading-secondary ma-bt-lg">Your Review</h2>
            <textarea
              rows="15"
              cols="50"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div className="rating-section">
              <h2 className="heading-secondary ma-bt-lg">Your Rating</h2>
              <Rating
                // className="rating"
                style={{
                  fontSize: "40px",
                  alignItems: "center",
                }}
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 0.55, fontSize: "40px" }}
                    // fontSize="inherit"
                  />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2, fontSize: "20px", marginLeft: "5rem" }}>
                  {labels[hover !== -1 ? hover : value]}
                </Box>
              )}
            </div>
            <div className="submitButton">
              <button
                className="btn btn--green btn--small"
                onClick={async () => {
                  await AxiosApi.post("/reviews", {
                    review: text,
                    rating: value,
                    user: currentUser._id,
                    tour: tour._id,
                  }).then((res) => {
                    console.log(res);
                    alert("review successfully!");
                    navigate("../mybooking");
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerReview;

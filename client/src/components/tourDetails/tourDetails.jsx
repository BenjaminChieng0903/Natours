import { useEffect } from "react";
import "./tourDetails.css";
import { useDispatch, useSelector } from "react-redux";
import Map from "./../mapbox/map";
import {
  selectorCardIndex,
  selectorTours,
} from "../store/tours/tours.selector";
import { selectorReviews } from "../store/reviews/reviews.selector";
import ReviewCard from "./reviewCard";
// import { url } from "inspector";
const TourDetails = () => {
  const cardIndex = useSelector(selectorCardIndex);
  const reviews = useSelector(selectorReviews);
  const tours = useSelector(selectorTours);
  const tour = tours.data[cardIndex];

  // console.log(tour);
  const convertDateFormat = () => {
    const dateObject = new Date(tour.startDates[0]);
    const options = { year: "numeric", month: "short", timeZone: "UTC" };
    const formattedDate = dateObject.toLocaleString("en-AU", options);
    console.log(formattedDate);
    return formattedDate;
  };
  useEffect(() => {
    // const tour = tours[cardIndex];
  }, []);

  return (
    <>
      <section
        className="section-header"
        style={{
          backgroundImage: `url('/img/tours/${tour.imageCover}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>
              {`${tour.name.split(" ")[0]}${tour.name.split(" ")[1]}`} <br />
              {`${tour.name.split(" ")[2]}`}
            </span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.address}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">
                  {convertDateFormat()}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{tour.difficulty}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-user"></use>
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{tour.maxGroupSize}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-star"></use>
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
                      src={`img/users/${guide.photo}`}
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
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name}</h2>
          <p className="description__text">{tour.description.split("\n")[0]}</p>
          <p className="description__text">{tour.description.split("\n")[1]}</p>
        </div>
      </section>

      <section className="section-pictures">
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--1"
            src={`img/tours/${tour.images[0]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--2"
            src={`img/tours/${tour.images[1]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--3"
            src={`img/tours/${tour.images[2]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
      </section>
      <section className="section-map">
        <Map />
      </section>
      <section className="section-reviews">
        <div className="reviews">
          {reviews.map((review) => {
            return <ReviewCard review={review} />;
          })}
        </div>
      </section>
      <section class="section-cta">
        <div class="cta">
          <div class="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img class="cta__img cta__img--1" src="/img/tour-5-2.jpg" alt="" />
          <img class="cta__img cta__img--2" src="/img/tour-5-1.jpg" alt="" />
          <div class="cta__content">
            <h2 class="heading-secondary">What are you waiting for?</h2>
            <p class="cta__text">
              {`${tour.duration} days. ${tour.locations.length} adventure. Infinite memories. Make it yours today!`}
            </p>
            <button class="btn btn--green span-all-rows">Book tour now!</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetails;

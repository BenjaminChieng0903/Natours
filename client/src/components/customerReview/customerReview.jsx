import { useSelector } from "react-redux";
import "./customerReview.css";
import { selectorBookingsReview } from "../store/booking/booking.selector";

const CustomerReview = () => {
  const tour = useSelector(selectorBookingsReview);
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
    console.log(formattedDate);
    return formattedDate;
  };
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
          <div className="customer-review-section">hi, reviewSection</div>
        </div>
      </div>
    </main>
  );
};

export default CustomerReview;

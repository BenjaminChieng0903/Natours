// import "./../../css/styles.css";
import { useNavigate } from "react-router-dom";
import "./card.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCardDetailsIndex } from "../../store/tours/tours.action";
import AxiosApi from "./../../../axiosApi/api";
import { selectorTours } from "../../store/tours/tours.selector";
import { SetTourReviews } from "../../store/reviews/reviews.action";
const Card = ({ categories, index }) => {
  // console.log(categories);
  console.log(index);
  console.log(categories._id);
  // console.log(categories);
  // const tour = categories[index];
  // console.log(tour);
  const dispatch = useDispatch();
  const {
    difficulty,
    duration,
    summary,
    maxGroupSize,
    price,
    ratingsAverage,
    ratingsQuantity,
    name,
    imageCover,
    startLocation,
    startDates,
    locations,
  } = categories;
  const navigate = useNavigate();
  const imageUrl = `img/tours/${imageCover}`;
  //   console.log(typeof startDates[0]);
  //   console.log(isDate(startDates[0]));
  const firstDateArr = startDates[0].slice(0, 7).split("-");
  const firstDate = firstDateArr[1].concat("/", firstDateArr[0]);

  //   console.log(firstDateArr);
  //   const firstDate = firstDateArr[1].concat(firstDateArr[0]);
  //   startDates[0].toLocaleString("en-AU", {
  //     month: "long",
  //     year: "numeric",
  //   });

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img src={imageUrl} alt={name} className="card__picture-img" />
        </div>

        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {difficulty} {duration}-days tour
        </h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span> {firstDate}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-flag"></use>
          </svg>
          <span>{locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-user"></use>
          </svg>
          <span>{maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price} </span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAverage}</span>
          <span className="card__footer-text"> rating ({ratingsQuantity})</span>
        </p>
        <button
          className="btn btn--green btn--small"
          onClick={async () => {
            //store the corresponding tour index so that can get its data and show its details on details page
            dispatch(setCurrentCardDetailsIndex(index));
            //search all the reviews that related to this tour and store them into Redux.

            await AxiosApi.get(`/reviews/${categories._id}`).then((res) => {
              console.log(res.data.data.reviews);
              dispatch(SetTourReviews(res.data.data.reviews));
            });
            navigate("/details");
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Card;

// import "./../../css/styles.css";
import "./card.scss";
const Card = ({ categories }) => {
  console.log(categories);
  const {
    difficulty,
    duration,
    summary,
    maxGroupSize,
    price,
    rating,
    ratingsQuantity,
  } = categories;
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src="img/tour-1-cover.jpg"
            alt="Tour 1"
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>The Forest Hiker</span>
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
          <span>Banff, Canada</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>April 2021</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="img/icons.svg#icon-flag"></use>
          </svg>
          <span>3 stops</span>
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
          <span className="card__footer-value">{price}</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{rating}</span>
          <span className="card__footer-text">rating ({ratingsQuantity})</span>
        </p>
        <a href="#" className="btn btn--green btn--small">
          Details
        </a>
      </div>
    </div>
  );
};

export default Card;

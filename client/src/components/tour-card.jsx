import "./tour-card.scss";
const TourCard = () => {
  return (
    <div class="card">
      <div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          <img
            class="card__picture-img"
            src="img/tour-1-cover.jpg"
            alt="Tour 1"
          />
        </div>
        <h3 class="heading-tertirary">
          <span>The Forest Hiker</span>
        </h3>
      </div>
      <div class="card__details">
        <h4 class="card__sub-heading">Easy 5-day tour</h4>
        <p class="card__text">
          Breathtaking hike through the Canadian Banff National Park
        </p>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>Banff, Canada</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>April 2021</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-flag"></use>
          </svg>
          <span>3 stops</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-user"></use>
          </svg>
          <span>25 people</span>
        </div>
      </div>
      <div class="card__footer">
        <p>
          <span class="card__footer-value">$297</span>
          <span class="card__footer-text">per person</span>
        </p>
        <p class="card__ratings">
          <span class="card__footer-value">4.9</span>
          <span class="card__footer-text">rating (21)</span>
        </p>
        <a class="btn btn--green btn--small" href="#">
          Details
        </a>
      </div>
    </div>
  );
};

export default TourCard;

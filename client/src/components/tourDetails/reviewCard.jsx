import "./reviewCard.css";

const ReviewCard = ({ review }) => {
  //   console.log(review);
  const ratingArr = [];
  for (let i = 0; i < review.rating; i++) {
    ratingArr.push(
      <svg className="reviews__star reviews__star--active">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
    );
  }
  //   console.log(ratingArr);
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`img/users/${review.user.photo}`}
          alt={review.user.name}
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">{ratingArr.map((item) => item)}</div>
    </div>
  );
};

export default ReviewCard;

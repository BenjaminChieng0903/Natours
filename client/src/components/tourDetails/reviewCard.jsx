import "./reviewCard.css";
import { useDispatch, useSelector } from "react-redux";

import {
  selectorCardIndex,
  selectorTours,
} from "../store/tours/tours.selector";
const ReviewCard = () => {
  const cardIndex = useSelector(selectorCardIndex);
  const tours = useSelector(selectorTours);
  const tour = tours.data[cardIndex];
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src="img/users/user-7.jpg"
          alt="Jim Brown"
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">Jim Brown</h6>
      </div>
      <p className="reviews__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
        dignissimos sint quo commodi corrupti accusantium veniam saepe numquam.
      </p>
      <div className="reviews__rating">
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
      </div>
    </div>
  );
};

export default ReviewCard;

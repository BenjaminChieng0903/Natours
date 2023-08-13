import { CreateAction } from "../../../utils/CreateAction";
import { REVIEWS_ACTION_TYPE } from "./reviews.type";

export const SetTourReviews = (reviews) => {
  return CreateAction(REVIEWS_ACTION_TYPE.SET_TOUR_REVIEWS, reviews);
};

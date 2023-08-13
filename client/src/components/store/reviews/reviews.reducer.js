import { REVIEWS_ACTION_TYPE } from "./reviews.type";

const REVIEWS_INITIAL_STATE = {
  reviews: {},
};

export const reviewsReducer = (state = REVIEWS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case REVIEWS_ACTION_TYPE.SET_TOUR_REVIEWS:
      return { ...state, reviews: payload };
    default:
      return state;
  }
};

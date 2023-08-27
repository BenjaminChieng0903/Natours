import { BOOKING_ACTION_TYPE } from "./booking.type";

const BOOKING_INITIAL_STATE = {
  booking: null,
};

export const bookingReducer = (state = BOOKING_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case BOOKING_ACTION_TYPE.SET_MY_BOOKING:
      return { ...state, booking: payload };
    case BOOKING_ACTION_TYPE.BOOKING_REVIEW:
      return { ...state, review: payload };
    default:
      return state;
  }
};

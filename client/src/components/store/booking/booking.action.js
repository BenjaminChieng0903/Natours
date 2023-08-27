import { CreateAction } from "../../../utils/CreateAction";
import { BOOKING_ACTION_TYPE } from "./booking.type";

export const SetMyBooking = (booking) => {
  return CreateAction(BOOKING_ACTION_TYPE.SET_MY_BOOKING, booking);
};
export const SetMyBookingReview = (booking) => {
  return CreateAction(BOOKING_ACTION_TYPE.BOOKING_REVIEW, booking);
};

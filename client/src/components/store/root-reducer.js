import { combineReducers } from "redux";
import { toursReducer } from "./tours/tours.reducer";
import { userReducer } from "./user/user.reducer";
import { reviewsReducer } from "./reviews/reviews.reducer";
import { bookingReducer } from "./booking/booking.reducer";
export const rootReducer = combineReducers({
  //   user: userReducer,
  tours: toursReducer,
  user: userReducer,
  reviews: reviewsReducer,
  booking: bookingReducer,
});

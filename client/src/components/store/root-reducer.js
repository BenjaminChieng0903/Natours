import { combineReducers } from "redux";
import { toursReducer } from "./tours/tours.reducer";
import { userReducer } from "./user/user.reducer";
export const rootReducer = combineReducers({
  //   user: userReducer,
  tours: toursReducer,
  user: userReducer,
});

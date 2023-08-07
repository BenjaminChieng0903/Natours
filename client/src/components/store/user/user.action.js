import { CreateAction } from "../../../utils/CreateAction";
import { USER_ACTION_TYPE } from "./user.type";
export const setCurrentUser = (user) => {
  return CreateAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
};

export const removeCurrentUser = (user) => {
  return CreateAction(USER_ACTION_TYPE.REMOVE_CURRENT_USER, user);
};

import { USER_ACTION_TYPE } from "./user.type";
const USER_INITIAL_STATE = {
  currentUser: null,
};
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;
  const validUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPE.REMOVE_CURRENT_USER:
      return { currentUser: null };
    case USER_ACTION_TYPE.UPDATE_CURRENT_USER_PHOTO:
      // const{photo: payload} = state.currentUser
      //payload:[imgUrl, name]
      //payload:[imgUrl] or payload:[name]
      //if payload.length == 1, it neither imgUrl or name. So we validate if the payload[0] is valid url. If yes,
      //then update photo, otherwise update name
      if (payload.length === 1) {
        if (validUrl(payload[0]))
          return { currentUser: { ...state.currentUser, photo: payload[0] } };
        else return { currentUser: { ...state.currentUser, name: payload[0] } };
      } else
        return {
          currentUser: {
            ...state.currentUser,
            photo: payload[0],
            name: payload[1],
          },
        };
    case USER_ACTION_TYPE.UPDATE_CURRENT_SUER_TOKEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          token: payload,
        },
      };
    case USER_ACTION_TYPE.SET_CURRENT_CARD_DETAILS_INDEX:
      return {
        ...state,
        card_index: payload,
      };
    default:
      return state;
  }
};

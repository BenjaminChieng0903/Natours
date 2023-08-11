import { TOURS_ACTION_TYPE } from "./tours.type";

const TOURS_INITIAL_STATE = {
  tours: {},
  isLoading: false,
  error: null,
};

export const toursReducer = (state = TOURS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TOURS_ACTION_TYPE.FETCH_TOURS_SUCCESS:
      return { ...state, tours: payload, isLoading: false };
    case TOURS_ACTION_TYPE.SET_CURRENT_CARD_DETAILS_INDEX:
      return {
        ...state,
        card_index: payload,
      };
    case TOURS_ACTION_TYPE.REMOVE_CURRENT_CARD_IDNEX:
      return { ...state, card_index: payload };
    default:
      return state;
  }
};

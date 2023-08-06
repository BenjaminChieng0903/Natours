import { TOURS_ACTION_TYPE } from "./tours.type";
import { CreateAction } from "../../../utils/CreateAction";

export const FetchToursSuccess = (tours) => {
  return CreateAction(TOURS_ACTION_TYPE.FETCH_TOURS_SUCCESS, tours);
};

// export const FetchTours = ()=>{

// }

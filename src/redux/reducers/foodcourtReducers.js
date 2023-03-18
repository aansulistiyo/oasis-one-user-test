import { ActionTypes } from "../constants/action-types";

const foodcourtReducers = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FOODCOURT:
      return { ...state, ...payload };
    case ActionTypes.CLEAR_FOODCOURT:
      return {};
    default:
      return state;
  }
};

export default foodcourtReducers;

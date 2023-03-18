import { ActionTypes } from "../constants/action-types";
const initialUserState = [];
const orderReducers = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER:
      return [...payload];
    case ActionTypes.CLEAR_ORDER:
      return [];
    default:
      return state;
  }
};

export default orderReducers;

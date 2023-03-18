import { ActionTypes } from "../constants/action-types";

export const setOrder = (order) => {
  return {
    type: ActionTypes.SET_ORDER,
    payload: order,
  };
};

export const clearOrder = () => {
  return {
    type: ActionTypes.CLEAR_ORDER,
    payload: [],
  };
};

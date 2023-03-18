import { ActionTypes } from "../constants/action-types";

export const setFoodcourt = (foodcourt) => {
  return {
    type: ActionTypes.SET_FOODCOURT,
    payload: foodcourt,
  };
};

export const clearFoodcourt = () => {
  return {
    type: ActionTypes.CLEAR_FOODCOURT,
    payload: [],
  };
};

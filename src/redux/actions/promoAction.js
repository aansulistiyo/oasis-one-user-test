import { ActionTypes } from "../constants/action-types";

export const setPromo = (promo) => {
  return {
    type: ActionTypes.SET_PROMO,
    payload: promo,
  };
};

export const clearPromo = () => {
  return {
    type: ActionTypes.CLEAR_PROMO,
    payload: [],
  };
};

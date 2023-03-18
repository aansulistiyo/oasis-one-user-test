import { ActionTypes } from "../constants/action-types";

const promoReducers = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PROMO:
      return { ...state, ...payload };
    case ActionTypes.CLEAR_PROMO:
      return {};
    default:
      return state;
  }
};

export default promoReducers;

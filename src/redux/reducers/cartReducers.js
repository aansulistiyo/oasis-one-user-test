import { ActionTypes } from "../constants/action-types";

const localCart = localStorage.getItem("cart");
let intialState = JSON.parse(localCart);

const cartReducers = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return [...payload];
    case ActionTypes.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export default cartReducers;

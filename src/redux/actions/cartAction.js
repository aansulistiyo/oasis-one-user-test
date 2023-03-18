import { ActionTypes } from "../constants/action-types";

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};

export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
    payload: [],
  };
};

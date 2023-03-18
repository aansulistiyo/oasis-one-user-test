import { ActionTypes } from "../constants/action-types";

// SearchBar
export const setTerms = (terms) => {
  return {
    type: ActionTypes.SET_TERMS,
    payload: terms,
  };
};

export const clearTerms = () => {
  return {
    type: ActionTypes.CLEAR_TERMS,
    payload: "",
  };
};
// End SearchBar

// Color
export const setColor = (color) => {
  return {
    type: ActionTypes.SET_COLOR,
    payload: color,
  };
};
// End Color

// Socket
export const setSocket = (socket) => {
  return {
    type: ActionTypes.SET_SOCKET,
    payload: socket,
  };
};
// End Socket

// HomeUrl
export const setHomeUrl = (url) => {
  return {
    type: ActionTypes.SET_HOMEURL,
    payload: url,
  };
};
// End Socket

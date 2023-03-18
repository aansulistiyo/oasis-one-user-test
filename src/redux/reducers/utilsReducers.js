import { ActionTypes } from "../constants/action-types";

export const searchBarReducers = (state = "", { type, payload }) => {
  let data = state;
  switch (type) {
    case ActionTypes.SET_TERMS:
      data = payload;
      return data;

    case ActionTypes.CLEAR_TERMS:
      return "";
    default:
      return state;
  }
};

let initialColor = localStorage.getItem("color");
export const colorReducers = (state = initialColor, { type, payload }) => {
  // let data = state;
  switch (type) {
    case ActionTypes.SET_COLOR:
      // data = payload;
      return payload;
    default:
      return state;
  }
};

export const socketReducers = (state = {}, { type, payload }) => {
  let data = state;
  switch (type) {
    case ActionTypes.SET_SOCKET:
      return { ...payload };
    default:
      return state;
  }
};

const homeUrl = localStorage.getItem("homeUrl");
export const HomeUrlReducers = (
  state = homeUrl === undefined ? "" : homeUrl,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_HOMEURL:
      return payload;
    default:
      return state;
  }
};

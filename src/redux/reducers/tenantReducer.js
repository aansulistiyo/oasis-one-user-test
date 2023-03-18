import { ActionTypes } from "../constants/action-types";

export const tenantReducers = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TENANT:
      return { ...state, ...payload };
    case ActionTypes.CLEAR_TENANT:
      return {};
    default:
      return state;
  }
};

export const menuReducers = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MENUS:
      return { ...state, ...payload };
    case ActionTypes.CLEAR_MENUS:
      return {};
    default:
      return state;
  }
};

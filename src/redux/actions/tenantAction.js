import { ActionTypes } from "../constants/action-types";

// Tenant
export const setTenant = (tenant) => {
  return {
    type: ActionTypes.SET_TENANT,
    payload: tenant,
  };
};

export const clearTenant = () => {
  return {
    type: ActionTypes.CLEAR_TENANT,
    payload: [],
  };
};

// Menu
export const setMenus = (menus) => {
  return {
    type: ActionTypes.SET_MENUS,
    payload: menus,
  };
};

export const clearMenus = () => {
  return {
    type: ActionTypes.CLEAR_MENUS,
    payload: [],
  };
};

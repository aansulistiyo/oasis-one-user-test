import { combineReducers } from "redux";
import foodcourtReducers from "./foodcourtReducers";
import * as Utils from "./utilsReducers";
import * as tenant from "./tenantReducer";
import promoReducers from "./promoReducers";
import cartReducers from "./cartReducers";
import orderReducers from "./orderReducers";

const reducers = combineReducers({
  foodcourt: foodcourtReducers,
  search: Utils.searchBarReducers,
  color: Utils.colorReducers,
  tenant: tenant.tenantReducers,
  menus: tenant.menuReducers,
  promo: promoReducers,
  cart: cartReducers,
  order: orderReducers,
  socket: Utils.socketReducers,
  homeUrl: Utils.HomeUrlReducers,
});

export default reducers;

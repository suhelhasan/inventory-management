import isLogged from "./isLogged";
import user from "./user";
import salesChannel from "./salesChannel";
import salesItem from "./salesItem";
import userCart from "./customerItems";
import customers from "./customers";

import { combineReducers } from "redux";

export const allReducers = combineReducers({
  isLogged,
  user,
  salesChannel,
  salesItem,
  userCart,
  customers,
});

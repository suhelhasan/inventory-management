import isLogged from "./isLogged";
import user from "./user";
import salesChannel from "./salesChannel";

import { combineReducers } from "redux";

export const allReducers = combineReducers({
  isLogged,
  user,
  salesChannel,
});

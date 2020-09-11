import counter from "./counter";
import isLogged from "./isLogged";
import user from "./user";

import { combineReducers } from "redux";

export const allReducers = combineReducers({
  counter,
  isLogged,
  user,
});

import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import RegisterShop from "../Components/RegisterShop/RegisterShop";
import NotFound from "../Components/404/NotFound";

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/register" component={RegisterShop} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routing;

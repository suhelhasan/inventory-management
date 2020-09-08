import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default Routing;

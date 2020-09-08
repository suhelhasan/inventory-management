import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function Dashboard() {
  let loggedIn = useSelector((state) => state.isLogged);

  if (!loggedIn) {
    return <Redirect to="signin" />;
  }
  return (
    <div>
      <h1>Welcome to the dashboard</h1>
    </div>
  );
}

export default Dashboard;

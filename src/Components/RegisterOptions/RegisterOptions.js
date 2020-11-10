import React, { useState } from "react";
import styling from "./RegisterOptions.module.css";
import image from "../../assets/RegisterOptions1.svg";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function RegisterOptions() {
  let [passcode, setPasscode] = useState("");
  let shopDetails = useSelector((state) => state.shopDetails);
  let loggedIn = useSelector((state) => state.isLogged);

  if (!loggedIn) {
    // return <Redirect to="signin" />;
  }
  if (shopDetails) {
    // return <Redirect to="dashboard" />;
  }
  let checkPasscode = () => {
    alert("hello");
  };

  return (
    <div className={styling.RegisterOptions}>
      <div className={styling.RegisterOptionsContent}>
        <img src={image} alt="loginOptions" />
      </div>
      <div className={styling.RegisterOptionsTextArea}>
        <h2>
          Click Admin to register your shop or Enter the passcode to access the
          Inventory Management
        </h2>
        <Link to="/register">
          <div className={styling.buttonDiv}>
            <p>Admin (Owner)</p>
          </div>
        </Link>

        <p>Or</p>
        <div className={styling.inputDiv}>
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter Passkey"
            autoFocus="true"
          />
          <button autoFocus onClick={checkPasscode}>
            Enter as Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterOptions;

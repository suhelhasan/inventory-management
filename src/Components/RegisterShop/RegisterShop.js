import React from "react";
import styling from "./RegisterShop.module.css";
import Registration from "./Registration/Registration";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import RegImg from "../../assets/registerPage.svg";
import { BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";

function RegisterShop() {
  let shopDetails = useSelector((state) => state.shopDetails);
  let loggedIn = useSelector((state) => state.isLogged);

  if (!loggedIn) {
    return <Redirect to="signin" />;
  }
  if (shopDetails.shopName) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className={styling.RegisterShop}>
      <div className={styling.imageSection}>
        <h2>
          <Link to="/">
            ShopManager <BsGraphUp className={styling.logoIcon} />
          </Link>
        </h2>
        <img src={RegImg} alt="avatar" />
      </div>
      <div className={styling.RegForm}>
        <Registration />
      </div>
    </div>
  );
}

export default RegisterShop;

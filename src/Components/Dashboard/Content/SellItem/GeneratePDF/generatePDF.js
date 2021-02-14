import React, { Component } from "react";
import UserCart from "../UserCart/UserCart";
import styling from "./generatePDF.module.css";
import { useSelector, useDispatch } from "react-redux";

export default class generatePDF extends Component {
  render() {
    let { name, email } = this.props.userInfo;
    let { shopName, shopMail, shopAddress, shopPhone } = this.props.shopDetails;
    let date = new Date();
    return (
      <div className={styling.generatePDF}>
        <div className={styling.infoSection}>
          <p>{date.toString().split("G")[0]}</p>
        </div>
        <div className={styling.shopInfo}>
          <h1>{shopName}</h1>
          <p>Address: {shopAddress}</p>
          <p>Phone: {shopPhone}</p>
          <p>Email: {shopMail}</p>
          <p>
            Billing By: {name} ( {email} )
          </p>
        </div>
        <UserCart hideAction="true" />
      </div>
    );
  }
}

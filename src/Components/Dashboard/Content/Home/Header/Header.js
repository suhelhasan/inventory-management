import React from "react";
import styling from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
// import {  } from "../../../../../redux/actions/actions";
import welcomeImage from "../../../../../assets/welcomeImage.svg";

export default function Header() {
  let user = useSelector((state) => state.user);
  var hour = new Date().getHours();
  var wish =
    "Good " +
    ((hour < 12 && "Morning") || (hour < 18 && "Afternoon") || "Evening");
  return (
    <div className={styling.Header}>
      <div className={styling.HeaderText}>
        <h1>
          Hi {user?.name?.split(" ")[0]}, {wish}
        </h1>
        <h2>Here is what is happining with your store today.</h2>
      </div>
      <div className={styling.HeaderImage}>
        <img src={welcomeImage} alt="welcomeImage" />
      </div>
    </div>
  );
}

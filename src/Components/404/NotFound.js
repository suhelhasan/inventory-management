import React from "react";
import styling from "./NotFound.module.css";
import image404 from "../../assets/404.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styling.NotFound}>
      <div className={styling.container}>
        <img src={image404} alt="404 page not found" />
        <h1 className={styling.info}>404 Page not found</h1>
        <h1 className={styling.task}>
          Visit <Link to="/">ShopManager</Link>
        </h1>
      </div>
    </div>
  );
}

export default NotFound;

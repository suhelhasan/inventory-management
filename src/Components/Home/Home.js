import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../../firebase/firebase";
import { isLoggedIn } from "../../redux/actions/actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styling from "./Home.module.css";
import coverImage from "../../assets/coverPageImage.svg";
import { BiRightArrowAlt } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
function Home() {
  let loggedIn = useSelector((state) => state.isLogged);
  return (
    <>
      <Navbar />
      <div className={styling.HomePage}>
        <div className={styling.textDiv}>
          <h1>The best inventory</h1>
          <h1>management platform</h1>
          <p>Built to make your work easier.</p>
          <p>
            Our software is a free inventory management platform that solves the
            problem of managing money
          </p>
          <div className={styling.buttonSection}>
            {loggedIn ? (
              <Link to="/dashboard">
                <div className={styling.button1}>
                  Go to Dashboard
                  <RiArrowRightSLine className={styling.arrow} />
                </div>
              </Link>
            ) : (
              <Link to="/signin">
                <div className={styling.button1}>
                  Sign In <RiArrowRightSLine className={styling.arrow} />
                </div>
              </Link>
            )}
            <a href="ccc" alt="fgg">
              <div className={styling.button2}>
                Contact Us <RiArrowRightSLine className={styling.arrow} />
              </div>
            </a>
          </div>
        </div>
        <div className={styling.imageDiv}>
          <img src={coverImage} alt="cover" />
        </div>
      </div>
    </>
  );
}

export default Home;
